import Scan from '../models/Scan.model';

export default {
  async getList(req, res) {
    const data = await Scan.getList()
    res.json(data)
  },
  getDetails(req, res) {},
  createNewScan(req, res) {}
};
