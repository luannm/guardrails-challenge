import React from 'react';
import moment from 'moment';
import {
  Table, PageHeader, Button, Tag,
} from 'antd';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/**
 * TODO:
 * 1) Write UT
 */

const tableColumns = [
  {
    title: 'Repository',
    dataIndex: 'repoName',
  },
  {
    title: 'Status',
    dataIndex: 'status',
  },
  {
    title: 'Findings',
    dataIndex: 'totalFindings',
    render: (val) => <Tag color="blue">{`${val} issue(s) found`}</Tag>,
  },
  {
    title: 'Date',
    dataIndex: 'date',
    render: (val) => val && <span>{moment.unix(val).format('MM/DD/YYYY - hh:mm:ss')}</span>,
  },
];

const ScanResultView = ({ tableData, loading }) => (
  <PageHeader
    title="Scan Result"
    extra={[
      <Link to="/submit" key="btnSubmit">
        <Button type="primary">Submit New Result</Button>
      </Link>,
    ]}
  >
    <Table
      pagination={false}
      loading={loading}
      columns={tableColumns}
      dataSource={tableData}
    />
  </PageHeader>
);

ScanResultView.propTypes = {
  tableData: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
};

ScanResultView.defaultProps = {
  tableData: [],
  loading: false,
};

export default ScanResultView;
