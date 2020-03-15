import React from 'react';
import { Form, Input, Radio } from 'antd';
import PropTypes from 'prop-types';
import { SCAN_STATUS } from '../../../../constant';

const GeneralInfoForm = ({ form }) => {
  const formLayout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 5 },
    labelAlign: 'left',
  };

  return (
    <Form {...formLayout} name="generalInfoForm" form={form}>
      <Form.Item
        label="Repository"
        name="repoName"
        rules={[{ required: true, message: 'Please input repository name' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Status"
        name="status"
        rules={[{ required: true, message: 'Please select status' }]}
      >
        <Radio.Group defaultValue="queued">
          <Radio.Button value={SCAN_STATUS.QUEUED}>Queued</Radio.Button>
          <Radio.Button value={SCAN_STATUS.IN_PROGRESS}>In Progress</Radio.Button>
          <Radio.Button value={SCAN_STATUS.SUCCESS}>Success</Radio.Button>
          <Radio.Button value={SCAN_STATUS.FAILURE}>Failure</Radio.Button>
        </Radio.Group>
      </Form.Item>
    </Form>
  );
};

GeneralInfoForm.propTypes = {
  form: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default GeneralInfoForm;
