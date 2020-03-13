import React from 'react';
import { Table, PageHeader, Button } from 'antd';
import PropTypes from 'prop-types';

/**
 * TODO:
 * 1) Write UT
 */

const ScanResultView = ({ tableColumns, tableData, onSubmitClick }) => {
  return (
    <PageHeader
      title="Scan Result"
      extra={[
        <Button onClick={onSubmitClick} type="primary">
          Submit New Result
        </Button>
      ]}>
      <Table columns={tableColumns} dataSource={tableData} />
    </PageHeader>
  );
};

ScanResultView.propTypes = {
  tableColumns: PropTypes.array.isRequired,
  tableData: PropTypes.array,
  onSubmitClick: PropTypes.func
};

ScanResultView.defaultProps = {
  tableData: []
};

export default ScanResultView;
