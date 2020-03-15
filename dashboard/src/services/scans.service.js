import axios from 'axios';

// FIXME: Move baseUrl to .env file later
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

const formatLocation = (location = {}) => {
  const { path, positions: { begin } } = location;
  return `File: ${path}, Line: ${begin.line}`;
};

const formatScanList = (data = []) => data.map(({
  id, repoName, status, findings, ...restFields
}) => ({
  id,
  repoName,
  status,
  totalFindings: findings.length,
  date: restFields[MAPPING_DATE_FIELD[status]],
}));

const formatScanDetails = (data = {}) => {
  const { id, findings } = data;
  return findings.map(({ ruleId, metadata, location }) => {
    const { description, severity } = metadata;
    return {
      id,
      ruleId,
      description,
      severity,
      location: formatLocation(location),
    };
  });
};

export default {
  async fetchScanResults() {
    const { data } = await client.get('/scans');
    const result = formatScanList(data);
    return result;
  },
  async fetchScan(id) {
    const { data } = await client.get(`/scans/${id}`);
    const result = formatScanDetails(data);
    return result;
  },
};
