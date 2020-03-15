import { db } from '../services/firebase';

const COLLECTION_NAME = 'scans';

// Declare types
export enum ScanStatus {
  QUEUED = 'Queued',
  IN_PROGRESS = 'In Progress',
  SUCCESS = 'Success',
  FAILURE = 'Failure'
}

type ScanFindings = {
  type: string,
  ruleId: string,
  location: {
    path: string,
    positions: object
  },
  metadata: {
    description: string,
    severity: string
  }
}

export type ScanResult = {
  id?: string,
  status: ScanStatus,
  repoName: string,
  findings: ScanFindings[]
  queuedAt: number,
  scanningAt?: number,
  finishedAt?: number
}

export default {
  async getList() {
    const snapshot = await db.collection(COLLECTION_NAME).get();
    const data = [];
    snapshot.forEach((doc) => {
      const payload: ScanResult = {
        id: doc.id,
        ...doc.data(),
      };
      data.push(payload);
    });
    return data;
  },
  async getDetails(id) {
    if (!id) throw new Error('Missing ID');
    const doc = await db.collection(COLLECTION_NAME).doc(id).get();
    if (!doc.exists) {
      throw new Error('Scan result is empty');
    }
    const payload: ScanResult = {
      id: doc.id,
      ...doc.data(),
    };
    return payload;
  },
  async saveResult(id, payload: ScanResult) {
    const { repoName, status } = payload;
    if (!repoName || !status) {
      throw new Error('Missing required params');
    }
    let doc;
    if (!id) {
      // Create
      doc = await db.collection(COLLECTION_NAME).add(payload);
    } else {
      // Update
      doc = await db.collection(COLLECTION_NAME).doc(id).set(payload, { merge: true });
    }
    return {
      id: doc.id,
      ...payload,
    };
  },
};
