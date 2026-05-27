import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { readBoyDetailsFromExcel, writeResultsToExcel, createDetailedResultsExcel } from '../services/excel.service';
import { calculateGunaMilan, BirthDetails } from '../services/milan.service';
import { generateCompatibilityAnalysis } from '../services/ai-milan.service';
import path from 'path';

// Schema for input validation
const MatchRequestSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  dateOfBirth: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, 'Date of Birth must be in DD/MM/YYYY format'),
  time: z.string().min(1, 'Time is required'),
  place: z.string().min(2, 'Place is required'),
});

/**
 * GET /api/milan/boy-details
 * Fetch pre-loaded boy details from the main Excel file.
 */
export async function getBoyDetails(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const boyDetails = await readBoyDetailsFromExcel();
    res.json({
      success: true,
      data: boyDetails,
    });
  } catch (error: any) {
    console.error('Error reading boy details:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to read boy details from Excel',
      message: error.message,
    });
  }
}

/**
 * POST /api/milan/match
 * Submit girl's details, match with boy, trigger AI, update Excel, return report.
 */
export async function matchMilan(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    // 1. Validate request body
    const girlDetailsParsed = MatchRequestSchema.parse(req.body);

    // 2. Read Boy details from Excel
    const boyDetailsExcel = await readBoyDetailsFromExcel();
    const boyDetails: BirthDetails = {
      name: boyDetailsExcel.name,
      dateOfBirth: boyDetailsExcel.dateOfBirth,
      time: boyDetailsExcel.time,
      place: boyDetailsExcel.place,
    };

    const girlDetails: BirthDetails = {
      name: girlDetailsParsed.name,
      dateOfBirth: girlDetailsParsed.dateOfBirth,
      time: girlDetailsParsed.time,
      place: girlDetailsParsed.place,
    };

    // 3. Calculate Guna Milan
    const matchingResult = calculateGunaMilan(boyDetails, girlDetails);

    // 4. Generate AI Compatibility Analysis
    const aiAnalysis = await generateCompatibilityAnalysis(matchingResult);

    // Combine result with AI insights
    const fullResult = {
      ...matchingResult,
      aiAnalysis,
    };

    // 5. Update main Excel file with girl details and results
    await writeResultsToExcel(girlDetails, matchingResult);

    // 6. Create detailed results Excel file
    const detailedExcelPath = await createDetailedResultsExcel(fullResult);
    const detailedExcelFilename = path.basename(detailedExcelPath);

    res.json({
      success: true,
      data: {
        result: fullResult,
        downloadUrl: `/api/milan/download/${detailedExcelFilename}`,
      },
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        error: 'Validation Error',
        details: error.errors.map(err => ({
          path: err.path.join('.'),
          message: err.message,
        })),
      });
      return;
    }

    console.error('Error in Guna Milan matching:', error);
    res.status(500).json({
      success: false,
      error: 'Calculation or process failed',
      message: error.message,
    });
  }
}

/**
 * GET /api/milan/download/:filename
 * Download the detailed results Excel sheet.
 */
export function downloadResultExcel(req: Request, res: Response): void {
  const filename = req.params.filename;
  // Ensure the filename is safe and points to the docs directory
  if (!/^[a-zA-Z0-9_.-]+$/.test(filename)) {
    res.status(400).json({ error: 'Invalid filename' });
    return;
  }

  const docsDir = path.resolve(__dirname, '../../..', 'docs');
  const filePath = path.join(docsDir, filename);

  res.download(filePath, filename, (err) => {
    if (err) {
      console.error('File download error:', err);
      if (!res.headersSent) {
        res.status(404).json({ error: 'File not found or expired' });
      }
    }
  });
}
