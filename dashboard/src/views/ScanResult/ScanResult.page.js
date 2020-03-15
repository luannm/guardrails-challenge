import React, { useState, useEffect } from 'react';
import ScanService from '../../services/scans.service';
import ScanResultView from './ScanResult.view';

const ScanResultPage = () => {
  /**
   * TODO:
   * 1) Write UT
   */
  const [isLoading, setIsLoading] = useState(true);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await ScanService.fetchScanResults();
        setTableData(data);
      } catch (error) {
        console.log('=== fetchResult error ===:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <ScanResultView
      loading={isLoading}
      tableData={tableData}
    />
  );
};

export default ScanResultPage;
