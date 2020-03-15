import React, { useState } from 'react';
import { notification } from 'antd';
import { useHistory } from 'react-router-dom';
import ScanService from '../../services/scans.service';
import ScanSubmitView from './ScanSubmit.view';

const ScanSubmitPage = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  const onSave = async (payload) => {
    try {
      await ScanService.saveScanResult(payload);
      notification.success({ message: 'Save data successfully' });
      history.push('/');
    } catch (error) {
      notification.success({ message: 'Something wrong!', description: error.message });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <ScanSubmitView onSave={onSave} loading={isLoading} />
  );
};

export default ScanSubmitPage;
