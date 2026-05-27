import { Router } from 'express';
import { getBoyDetails, matchMilan, downloadResultExcel } from '../controllers/milan.controller';

const router = Router();

// Route to get preloaded boy details from Excel
router.get('/boy-details', getBoyDetails);

// Route to calculate Guna Milan match
router.post('/match', matchMilan);

// Route to download detailed results spreadsheet
router.get('/download/:filename', downloadResultExcel);

export default router;
