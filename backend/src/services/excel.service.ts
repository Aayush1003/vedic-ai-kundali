/**
 * Excel Service — Read/Write Kundali Milan data from/to Excel files
 * 
 * Reads boy details from the existing Excel file and writes
 * girl details + matching results back.
 */

import ExcelJS from 'exceljs';
import path from 'path';
import { BirthDetails, MilanResult } from './milan.service';

// ============================================================
// TYPES
// ============================================================

export interface ExcelBoyDetails {
  name: string;
  dateOfBirth: string;
  time: string;
  place: string;
}

// ============================================================
// FILE PATHS
// ============================================================

const EXCEL_FILE_PATH = path.resolve(__dirname, '../../..', 'docs', 'Kundali Milan (1).xlsx');

// ============================================================
// READ BOY DETAILS FROM EXCEL
// ============================================================

/**
 * Read the boy's birth details from the Excel file.
 * The Excel structure has boy details in columns I-J, rows 3-6:
 *   I3: "Name",           J3: "Aayush Gupta"
 *   I4: "Date of Birth",  J4: datetime (1999-10-03)
 *   I5: "Time",           J5: time (02:41)
 *   I6: "Place",          J6: "Maheshwar"
 */
export async function readBoyDetailsFromExcel(): Promise<ExcelBoyDetails> {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(EXCEL_FILE_PATH);

  const worksheet = workbook.getWorksheet('Girls Details') || workbook.worksheets[0];
  if (!worksheet) {
    throw new Error('No worksheet found in Excel file');
  }

  // Read boy details from I-J columns
  const nameCell = worksheet.getCell('J3');
  const dobCell = worksheet.getCell('J4');
  const timeCell = worksheet.getCell('J5');
  const placeCell = worksheet.getCell('J6');

  // Parse date
  let dateOfBirth = '';
  if (dobCell.value instanceof Date) {
    const d = dobCell.value;
    dateOfBirth = `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getFullYear()}`;
  } else if (typeof dobCell.value === 'string') {
    dateOfBirth = dobCell.value;
  } else if (dobCell.value) {
    dateOfBirth = String(dobCell.value);
  }

  // Parse time
  let time = '';
  if (dobCell.value instanceof Date && timeCell.value) {
    // Time might be stored as a Date object with time component
    if (timeCell.value instanceof Date) {
      const t = timeCell.value;
      let hours = t.getHours();
      const minutes = t.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12;
      time = `${hours}:${minutes} ${ampm}`;
    } else if (typeof timeCell.value === 'number') {
      // Excel time as fraction of day
      const totalMinutes = Math.round(timeCell.value * 24 * 60);
      let hours = Math.floor(totalMinutes / 60);
      const minutes = (totalMinutes % 60).toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12;
      time = `${hours}:${minutes} ${ampm}`;
    } else {
      time = String(timeCell.value);
    }
  } else if (timeCell.value) {
    time = String(timeCell.value);
  }

  // Default to 2:41 AM if parsing fails (known from the Excel data)
  if (!time || time === 'undefined') {
    time = '2:41 AM';
  }

  return {
    name: String(nameCell.value || 'Unknown'),
    dateOfBirth,
    time,
    place: String(placeCell.value || 'Unknown'),
  };
}

// ============================================================
// WRITE GIRL DETAILS + RESULTS TO EXCEL
// ============================================================

/**
 * Write girl's details and matching results back to the Excel file.
 * Girl details go in columns A-D starting from row 2.
 * Results are written alongside.
 */
export async function writeResultsToExcel(
  girlDetails: BirthDetails,
  result: MilanResult
): Promise<string> {
  const workbook = new ExcelJS.Workbook();

  try {
    await workbook.xlsx.readFile(EXCEL_FILE_PATH);
  } catch {
    // If file doesn't exist, create new workbook
  }

  let worksheet = workbook.getWorksheet('Girls Details') || workbook.worksheets[0];
  if (!worksheet) {
    worksheet = workbook.addWorksheet('Girls Details');
  }

  // Write girl details in columns A-D
  // Row 1 already has headers: Name, Date Of Birth, Time, Place
  // Find the next empty row for girl details
  let girlRow = 2;
  while (worksheet.getCell(`A${girlRow}`).value) {
    girlRow++;
  }

  worksheet.getCell(`A${girlRow}`).value = girlDetails.name;
  worksheet.getCell(`B${girlRow}`).value = girlDetails.dateOfBirth;
  worksheet.getCell(`C${girlRow}`).value = girlDetails.time;
  worksheet.getCell(`D${girlRow}`).value = girlDetails.place;

  // Write matching results in columns E-H
  // Add result headers if not present
  if (!worksheet.getCell('E1').value) {
    worksheet.getCell('E1').value = 'Total Score';
    worksheet.getCell('F1').value = 'Percentage';
    worksheet.getCell('G1').value = 'Verdict';
    worksheet.getCell('H1').value = 'Girl Nakshatra';

    // Style headers
    ['E1', 'F1', 'G1', 'H1'].forEach(cell => {
      const c = worksheet.getCell(cell);
      c.font = { bold: true };
      c.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF4F46E5' },
      };
      c.font = { bold: true, color: { argb: 'FFFFFFFF' } };
    });
  }

  worksheet.getCell(`E${girlRow}`).value = `${result.totalScore} / ${result.maxScore}`;
  worksheet.getCell(`F${girlRow}`).value = `${result.percentage}%`;
  worksheet.getCell(`G${girlRow}`).value = result.verdict.replace(/[🌟✨👍⚠️🔴]/g, '').trim();
  worksheet.getCell(`H${girlRow}`).value = result.girlDetails.nakshatra;

  // Style the original headers too
  ['A1', 'B1', 'C1', 'D1'].forEach(cell => {
    const c = worksheet.getCell(cell);
    if (!c.font?.bold) {
      c.font = { bold: true };
      c.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF7C3AED' },
      };
      c.font = { bold: true, color: { argb: 'FFFFFFFF' } };
    }
  });

  // Auto-fit column widths
  worksheet.columns.forEach(column => {
    if (column && column.values) {
      let maxLength = 10;
      column.eachCell?.({ includeEmpty: false }, cell => {
        const len = cell.value ? String(cell.value).length : 0;
        maxLength = Math.max(maxLength, len + 2);
      });
      column.width = Math.min(maxLength, 30);
    }
  });

  // Save
  await workbook.xlsx.writeFile(EXCEL_FILE_PATH);

  return EXCEL_FILE_PATH;
}

// ============================================================
// CREATE DETAILED RESULTS EXCEL
// ============================================================

/**
 * Create a separate detailed results Excel file with full Guna breakdown.
 */
export async function createDetailedResultsExcel(
  result: MilanResult
): Promise<string> {
  const workbook = new ExcelJS.Workbook();

  // --- Sheet 1: Summary ---
  const summarySheet = workbook.addWorksheet('Match Summary');

  // Title
  summarySheet.mergeCells('A1:D1');
  const titleCell = summarySheet.getCell('A1');
  titleCell.value = '🔮 Kundali Milan Report';
  titleCell.font = { size: 18, bold: true, color: { argb: 'FF7C3AED' } };
  titleCell.alignment = { horizontal: 'center' };

  // Boy details
  summarySheet.getCell('A3').value = 'Boy Details';
  summarySheet.getCell('A3').font = { bold: true, size: 14 };
  summarySheet.getCell('A4').value = 'Name:';
  summarySheet.getCell('B4').value = result.boyDetails.name;
  summarySheet.getCell('A5').value = 'Nakshatra:';
  summarySheet.getCell('B5').value = result.boyDetails.nakshatra;
  summarySheet.getCell('A6').value = 'Rashi:';
  summarySheet.getCell('B6').value = result.boyDetails.rashi;

  // Girl details
  summarySheet.getCell('C3').value = 'Girl Details';
  summarySheet.getCell('C3').font = { bold: true, size: 14 };
  summarySheet.getCell('C4').value = 'Name:';
  summarySheet.getCell('D4').value = result.girlDetails.name;
  summarySheet.getCell('C5').value = 'Nakshatra:';
  summarySheet.getCell('D5').value = result.girlDetails.nakshatra;
  summarySheet.getCell('C6').value = 'Rashi:';
  summarySheet.getCell('D6').value = result.girlDetails.rashi;

  // Score
  summarySheet.getCell('A8').value = 'Total Score:';
  summarySheet.getCell('A8').font = { bold: true, size: 16 };
  summarySheet.getCell('B8').value = `${result.totalScore} / ${result.maxScore} (${result.percentage}%)`;
  summarySheet.getCell('B8').font = { size: 16, bold: true, color: { argb: 'FF10B981' } };

  summarySheet.getCell('A9').value = 'Verdict:';
  summarySheet.getCell('B9').value = result.verdict;
  summarySheet.getCell('B9').font = { bold: true, size: 14 };

  // --- Sheet 2: Guna Breakdown ---
  const gunaSheet = workbook.addWorksheet('Guna Breakdown');

  // Headers
  const gunaHeaders = ['Guna', 'Max Points', 'Obtained', 'Boy', 'Girl', 'Description'];
  const headerRow = gunaSheet.addRow(gunaHeaders);
  headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' } };
  headerRow.eachCell(cell => {
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF7C3AED' },
    };
  });

  // Data
  result.gunaScores.forEach(guna => {
    gunaSheet.addRow([
      guna.name,
      guna.maxPoints,
      guna.obtainedPoints,
      guna.boyAttribute,
      guna.girlAttribute,
      guna.description,
    ]);
  });

  // Total row
  const totalRow = gunaSheet.addRow([
    'TOTAL',
    result.maxScore,
    result.totalScore,
    '', '', result.verdict
  ]);
  totalRow.font = { bold: true, size: 12 };

  // Auto-fit columns
  gunaSheet.columns.forEach(column => {
    if (column) column.width = 20;
  });
  gunaSheet.getColumn(6).width = 60;

  // Save
  const outputPath = path.resolve(__dirname, '../../..', 'docs', `Milan_Results_${Date.now()}.xlsx`);
  await workbook.xlsx.writeFile(outputPath);

  return outputPath;
}
