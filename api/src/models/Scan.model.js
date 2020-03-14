import { db } from '../services/firebase';

const COLLECTION_NAME = 'scans';

export default {
  async getList() {
    const snapshot = await db.collection(COLLECTION_NAME).get();
    const data = [];
    snapshot.forEach(doc => {
      data.push({
        id: doc.id,
        data: doc.data()
      });
    });
    return data;
  }
};
