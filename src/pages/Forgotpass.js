import React, { Component } from 'react'
import { Form, Icon, Input, Button, Checkbox, } from 'antd';
import { Container, Row, Col } from 'reactstrap'
import './Login.css'
import axios from 'axios'
import url from '../url_config'
import { Translation } from 'react-i18next';
class Forgotpass extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        axios.post(`${url}/users/forgotpass`, values).then(async res => {
          const { data } = res
          console.log("Data ", data);
          alert("Please Check Your Email !")
          this.props.history.push(`/`)

        })
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 16, offset: 4 },
        md: { span: 12, offset: 6 },
        lg: { span: 8, offset: 8 }
      },
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 16, offset: 4 },
        md: { span: 12, offset: 6 },
        lg: { span: 8, offset: 8 }
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
          offset: 4,
        },
        md: {
          span: 12,
          offset: 6
        },
        lg: { span: 8, offset: 8 }
      },
    };
    return (
      <Translation>{t=>
      <Container style={{ height: "100vh" }} >
        <Row className="p-5" style={{ height: '100%', alignItems: 'center', justifyContent: 'center' }}>
          <Col>
            <div className="mt-5 mb-5" style={{ textAlign: 'center' }}><h5>{t('forgot_page.please')}</h5></div>
            <Form {...formItemLayout} onSubmit={this.handleSubmit} className="login-form">
              <Form.Item>
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
                })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="email" />)}
              </Form.Item>

              <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit" className="login-form-button">
                {t('forgot_page.sent')}
                </Button>
                {t('forgot_page.or')} <a href="/login">{t('forgot_page.login')} !</a>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Container>}
      </Translation>
    )
  }
}
export default Form.create({ name: 'forgotpass' })(Forgotpass);