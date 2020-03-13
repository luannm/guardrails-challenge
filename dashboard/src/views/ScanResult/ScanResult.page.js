import React from 'react';
import ScanResultView from './ScanResult.view'

const columns = [
  {
    title: 'Repository',
    dataIndex: 'repo',
    key: 'repo'
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status'
  },
  {
    title: 'Findings',
    dataIndex: 'totalFindings',
    key: 'totalFindings'
  },
  {
    title: 'Date',
    key: 'date',
    dataIndex: 'date'
  }
];

const data = [
  {
    id: '1',
    repo: 'Repo 1',
    status: 'In Progress',
    totalFindings: 3,
    date: '01/01/1990'
  }
];

const ScanResultPage = () => {
  /**
   * TODO:
   * 1) Handle logic to redirect to ScanSubmit page
   * 2) Implement API call
   * 3) Update UI
   * 4) Write UT
   */
  return (
    <ScanResultView tableColumns={columns} tableData={data} />
  );
}

export default ScanResultPage
