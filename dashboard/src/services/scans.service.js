import axios from 'axios';
import { SCAN_STATUS } from '../constant';

// FIXME: Move baseUrl to .env file later
const client = axios.create({
  baseURL: 'http://localhost:5000/api',
});

const MAPPING_DATE_FIELD = {
  [SCAN_STATUS.QUEUED]: 'queuedAt',
  [SCAN_STATUS.IN_PROGRESS]: 'scanningAt',
  [SCAN_STATUS.SUCCESS]: 'finishedAt',
  [SCAN_STATUS.FAILURE]: 'finishedAt',
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

const formatScan = (data = {}) => {
  const { findings, ...rest } = data;
  return {
    ...rest,
    findings: findings.map(({
      ruleId, type, description, severity, path, line,
    }) => ({
      ruleId,
      type,
      metadata: {
        description,
        severity,
      },
      location: {
        path,
        positions: {
          begin: {
            line,
          },
        },
      },
    })),
  };
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
  async saveScanResult(payload) {
    const formattedPayload = formatScan(payload);
    await client.post('/scans', formattedPayload);
    return formattedPayload;
  },
};
