import Scan, { ScanResult, ScanStatus } from '../models/Scan.model';

export default {
  async getList(req, res) {
    try {
      const data = await Scan.getList();
      res.json(data);
    } catch (error) {
      console.log('=== getList error ===: ', error);
      res.status(400).json({ error: error.message });
    }
  },
  async getDetails(req, res) {
    try {
      const { id } = req.params;
      const data = await Scan.getDetails(id);
      res.json(data);
    } catch (error) {
      console.log('=== getDetails error ===: ', error);
      res.status(400).json({ error: error.message });
    }
  },
  async createScan(req, res) {
    try {
      const payload: ScanResult = req.body;
      // Update payload
      payload.queuedAt = Date.now();
      const data = await Scan.saveResult(null, payload);
      res.json(data);
    } catch (error) {
      console.log('=== createScan error ===: ', error);
      res.status(400).json({ error: error.message });
    }
  },
  async updateScan(req, res) {
    try {
      const payload: ScanResult = req.body;
      const { status, id } = payload;
      // Update payload
      switch (status) {
        case ScanStatus.IN_PROGRESS:
          payload.scanningAt = Date.now();
          break;
        case ScanStatus.SUCCESS:
        case ScanStatus.FAILURE:
          payload.finishedAt = Date.now();
          break;
        default:
          break;
      }
      const data = await Scan.saveResult(id, payload);
      res.json(data);
    } catch (error) {
      console.log('=== updateScan error ===: ', error);
      res.status(400).json({ error: error.message });
    }
  }
};
