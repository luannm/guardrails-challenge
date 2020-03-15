import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ScanService from '../../services/scans.service';
import ScanDetailsView from './ScanDetails.view';

const ScanDetailsPage = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await ScanService.fetchScan(id);
        setTableData(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);
  return (
    <ScanDetailsView loading={isLoading} tableData={tableData} />
  );
};
export default ScanDetailsPage;
