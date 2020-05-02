import React, { Component } from 'react'
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete
} from 'antd';
import { Container } from 'reactstrap'
import { Link } from 'react-router-dom'
import axios from 'axios'
import url from '../../src/url_config'
import { Translation } from 'react-i18next';
const { Option } = Select;

class Register extends Component {
  state = {
    confirmDirty: false,
    // firstname: '',
    // lastname: '',
    // email: '',
    // password: '',
    // phone_number: ''
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        values.user_type = 'register'
        axios.post(`${url}/users/create`, values).then(res => {
          const { data } = res
          this.props.history.push(`/login`)
        })
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };


  render() {
    
    const { getFieldDecorator } = this.props.form;
      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
          md: { span: 6 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
          md: { span: 14 }
        },
      };
      const tailFormItemLayout = {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
          md: {
            span: 18,
            offset: 6
          }
        },
      };
      const prefixSelector = getFieldDecorator('prefix', {
        initialValue: '66',
      })(
        <Select style={{ width: 70 }}>
          <Option value="66">+66</Option>
        </Select>,
      );

      return (
        <Translation>{t =>
        <Container style={{ height: '100vh' }}>
          <Row className="p-5">
            <Col>
              <h1>{t('register_page.register')}</h1>
              <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                <Form.Item
                  label={
                    <span>
                      {t('register_page.firstname')}&nbsp;
              </span>
                  }
                >
                  {getFieldDecorator('firstname', {
                    rules: [{ required: true, message: 'Please input your firstname!', whitespace: true }],
                  })(<Input />)}
                </Form.Item>

                <Form.Item
                  label={
                    <span>
                      {t('register_page.lastname')}&nbsp;
              </span>
                  }
                >
                  {getFieldDecorator('lastname', {
                    rules: [{ required: true, message: 'Please input your lastname!', whitespace: true }],
                  })(<Input />)}
                </Form.Item>

                <Form.Item label={t('register_page.email')}>
                  {getFieldDecorator('email', {
                    rules: [
                      {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                      },
                      {
                        required: true,
                        message: 'Please input your E-mail!',
                      },
                    ],
                  })(<Input />)}
                </Form.Item>

                <Form.Item label={t('register_page.phoneNumber')}>
                  {getFieldDecorator('tel', {
                    rules: [{ required: true, message: 'Please input your phone number!' }],
                  })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} placeholder="83176xxxx" />)}
                </Form.Item>


                <Form.Item label={t('register_page.password')} hasFeedback>
                  {getFieldDecorator('password', {
                    rules: [
                      {
                        required: true,
                        message: 'Please input your password!',
                      },
                      {
                        validator: this.validateToNextPassword,
                      },
                    ],
                  })(<Input.Password />)}
                </Form.Item>

                <Form.Item label={t('register_page.confirmPassword')} hasFeedback>
                  {getFieldDecorator('confirm', {
                    rules: [
                      {
                        required: true,
                        message: 'Please confirm your password!',
                      },
                      {
                        validator: this.compareToFirstPassword,
                      },
                    ],
                  })(<Input.Password onBlur={this.handleConfirmBlur} />)}
                </Form.Item>

                <Form.Item {...tailFormItemLayout}>
                  <Button type="primary" htmlType="submit">
                  {t('register_page.register')}
                </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Container>
      }
      </Translation>
    );
  }
}
export default Form.create()(Register);