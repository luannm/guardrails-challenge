import React from 'react';
import { PageHeader, Button, Form, Input, Radio } from 'antd';
import PropTypes from 'prop-types';

/**
 * TODO:
 * 1) Write UT
 */

const ScanSubmitForm = ({ onCancel, onSave }) => {
  const formLayout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 6 },
    labelAlign: 'left'
  };

  return (
    <Form {...formLayout} name="form" onFinish={onSave}>
      <Form.Item
        label="Repository"
        name="RepositoryName"
        rules={[{ required: true, message: 'Please input repository name!' }]}>
        <Input />
      </Form.Item>
      <Form.Item
        label="Status"
        name="Status"
        rules={[{ required: true, message: 'Please input your password!' }]}>
        <Radio.Group defaultValue="queued">
          <Radio.Button value="queued">Queued</Radio.Button>
          <Radio.Button value="inProgress">In Progress</Radio.Button>
          <Radio.Button value="success">Success</Radio.Button>
          <Radio.Button value="failed">Failure</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" type="primary">
          Save
        </Button>
        <Button onClick={onCancel}>Cancel</Button>
      </Form.Item>
    </Form>
  );
};

const ScanSubmitView = ({ onSave, onCancel }) => {
  return (
    <PageHeader title="Submit New Scan Result">
      <ScanSubmitForm onSave={onSave} onCancel={onCancel} />
    </PageHeader>
  );
};

ScanSubmitView.propTypes = {
  onSave: PropTypes.func,
  onCancel: PropTypes.func
};

export default ScanSubmitView;
