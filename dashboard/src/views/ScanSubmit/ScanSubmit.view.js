import React from 'react';
import { PageHeader, Button, Form } from 'antd';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  GeneralInfoForm,
  VulnerabilityForm,
} from './components/ScanSubmitForm';

/**
 * TODO:
 * 1) Write UT
 */

const ScanSubmitView = ({ onSave, loading }) => { // eslint-disable-line
  const [generalInfoForm] = Form.useForm();
  const [vulnerabilityForm] = Form.useForm();
  const saveForm = async () => {
    // Validate fields
    await generalInfoForm.validateFields();
    await vulnerabilityForm.validateFields();
    // Get values
    const info = generalInfoForm.getFieldsValue();
    const { data } = vulnerabilityForm.getFieldsValue();
    onSave({
      ...info,
      findings: data,
    });
  };

  return (
    <PageHeader
      title="Submit New Scan Result"
      extra={[
        <Button key="btnSave" loading={loading} type="primary" onClick={saveForm}>
          Save
        </Button>,
        <Link to="/" key="btnBack">
          <Button type="danger">Cancel</Button>
        </Link>,
      ]}
    >
      <Form.Provider>
        <GeneralInfoForm form={generalInfoForm} />
        <Form.Item
          labelCol={{ span: 2 }}
          labelAlign="left"
          label="Vulnerabilities"
        >
          <VulnerabilityForm form={vulnerabilityForm} />
        </Form.Item>
      </Form.Provider>
    </PageHeader>
  );
};

ScanSubmitView.propTypes = {
  onSave: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

ScanSubmitView.defaultProps = {
  loading: false,
};

export default ScanSubmitView;
