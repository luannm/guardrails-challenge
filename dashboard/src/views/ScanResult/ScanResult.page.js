import React, { useState, useEffect } from 'react';
import ScanService from '../../services/scans.service';
import ScanResultView from './ScanResult.view';

const ScanResultPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [tableData, setTableData] = useState([]);

  async function fetchTableData() {
    try {
      const data = await ScanService.fetchScanResults();
      setTableData(data);
    } catch (error) {
      console.log('=== fetchResult error ===:', error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchTableData();
  }, []);

  return (
    <ScanResultView
      loading={isLoading}
      tableData={tableData}
    />
  );
};

export default ScanResultPage;
