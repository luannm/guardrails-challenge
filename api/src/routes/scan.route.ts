import { Router } from 'express';
import ScanController from '../controllers/scan.controller';

const router = Router();

router.get('/', ScanController.getList);
router.post('/', ScanController.createScan);
router.put('/', ScanController.updateScan);
router.get('/:id', ScanController.getDetails);

export default router;
