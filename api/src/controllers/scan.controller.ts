import Scan from '../models/Scan.model';

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
  createNewScan(req, res) {
    console.log('===', req, res);
  }
};
