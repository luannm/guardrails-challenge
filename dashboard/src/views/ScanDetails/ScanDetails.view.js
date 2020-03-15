import React from 'react';
import {
  Table, PageHeader, Typography, Button,
} from 'antd';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const { Text } = Typography;

/**
 * TODO:
 * 2) Write UT
 */

const tableColumns = [
  {
    title: 'Rule ID',
    dataIndex: 'ruleId',
  },
  {
    title: 'Description',
    dataIndex: 'description',
  },
  {
    title: 'Severity',
    dataIndex: 'severity',
  },
  {
    title: 'Location',
    dataIndex: 'location',
    render: (text) => <Text type="danger">{text}</Text>,
  },
];

const ScanDetailsView = ({ loading, tableData }) => (
  <PageHeader
    title="Scan Details"
    extra={[
      <Link to="/" key="btnBack">
        <Button>Go Back</Button>
      </Link>,
    ]}
  >
    <Table
      rowKey="id"
      pagination={false}
      loading={loading}
      columns={tableColumns}
      dataSource={tableData}
    />
  </PageHeader>
);

ScanDetailsView.propTypes = {
  tableData: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
};

ScanDetailsView.defaultProps = {
  tableData: [],
  loading: false,
};

export default ScanDetailsView;
