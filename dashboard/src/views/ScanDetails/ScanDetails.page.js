import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ScanService from '../../services/scans.service';
import ScanDetailsView from './ScanDetails.view';

const ScanDetailsPage = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [tableData, setTableData] = useState([]);

  async function fetchDetails() {
    try {
      const data = await ScanService.fetchScan(id);
      setTableData(data);
    } catch (error) {
      console.log('=== fetchDetails error ===:', error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <ScanDetailsView loading={isLoading} tableData={tableData} />
  );
};
export default ScanDetailsPage;
