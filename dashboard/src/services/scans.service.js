import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:8080/api',
});

const STATUS = {
  QUEUED: 'Queued',
  IN_PROGRESS: 'In Progress',
  SUCCESS: 'Success',
  FAILURE: 'Failure',
};

const MAPPING_DATE_FIELD = {
  [STATUS.QUEUED]: 'queuedAt',
  [STATUS.IN_PROGRESS]: 'scanningAt',
  [STATUS.SUCCESS]: 'finishedAt',
  [STATUS.FAILURE]: 'finishedAt',
};

const formatScanList = (data = []) => data.map(({
  id, repoName, status, findings, ...restFields
}) => ({
  id,
  key: id,
  repoName,
  status,
  totalFindings: findings.length,
  date: restFields[MAPPING_DATE_FIELD[status]],
}));

export default {
  async fetchScanResults() {
    const { data } = await client.get('/scans');
    const result = formatScanList(data);
    return result;
  },
};
