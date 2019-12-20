import React, { Component } from 'react'
import { Form, Icon, Input, Button, Checkbox, } from 'antd';
import { Container, Row, Col } from 'reactstrap'
import axios from 'axios'
import './Login.css'
import url from '../url_config'
import { useAuth0 } from "../react-auth0-spa";
const LoginFB = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  return (
    <div>

      <button onClick={() => loginWithRedirect({})}>Log in with Facebook</button>

    </div>
  );
};

class Login extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        axios.post(`${url}/users/login`, values).then(res => {
          const { data } = res
          console.log("res ", data);
          localStorage.setItem('token', data.token)
          this.props.history.push(`/`)
        })
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { loginWithRedirect } = useAuth0();
    const formItemLayout = {

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
      <Container style={{ height: "100vh" }} >
        <Row className="p-5" style={{ height: '100%', alignItems: 'center', justifyContent: 'center' }}>
          <Col>
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
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Please input your Password!' }],
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="Password"
                  />,
                )}
              </Form.Item>
              <Form.Item {...tailFormItemLayout}>
                {getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true,
                })(<Checkbox>Remember me</Checkbox>)}
                <a className="login-form-forgot" href="/forgotpass">
                  Forgot password
                </a>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  Log in
                </Button>
                Or <a href="/register">register now!</a>
              </Form.Item>

            </Form>
          </Col>
        </Row>
        <div>

          <button onClick={() => loginWithRedirect({})}>Log in with Facebook</button>

        </div>
        {/* <Row>
          <Col> */}
        {/* </Col>
        </Row> */}
      </Container>
    )
  }
}
export default Form.create({ name: 'login' })(Login);
