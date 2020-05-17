import React, { Component } from 'react'
import { Form, Icon, Input, Button, Checkbox, } from 'antd';
import { Container, Row, Col } from 'reactstrap'
import axios from 'axios'
import './Login.css'
import url from '../url_config'
import auth from '../service/index'
import { useAuth0 } from "../react-auth0-spa";
import { Router, Switch, Route, withRouter } from 'react-router-dom'
import { Translation } from 'react-i18next';
import FacebookLogin from 'react-facebook-login';

// const LoginFB = () => {
//   const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
//   return (
//     <div>
//       <Button type="button" onClick={() => loginWithRedirect({})}>Log in with Facebook</Button>
//     </div>
//   );
// };

class Login extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        axios.post(`${url}/users/login`, values).then(async res => {
          const { data } = res
          // console.log("Data ", data);
          if (data.message === 'Invalid password' || data.message === 'Email not found' || data.message === ' Email or Password Invalid') {
            alert(`${data.message}`)
          } else {
            // console.log('else token : ', data.token);
            if (data.token != undefined) {
              await localStorage.setItem('token', data.token)
              await this.props.onUserChanged(data.token);
              this.props.history.push(`/`)
            } else {
              alert(`${data.token}`)
              await auth.clearToken()
            }
          }
        })
      }
    });
  };
  callbackFB = (cb) => {
    // console.log("CB : ", cb);
    const firstname = cb.name.split(" ")
    // console.log("Split : ", firstname);

    const dataLogin = {
      "facebook": true,
      "email": cb.email,
      "facebook_id": cb.userID,
      "firstname": firstname[0],
      "lastname": firstname[1],
    }

    axios.post(`${url}/users/login`, dataLogin).then(async res => {
      const { data } = res
      // console.log("Data ", data);
      if (data.token != undefined) {
        await localStorage.setItem('token', data.token)
        await this.props.onUserChanged(data.token);
        this.props.history.push(`/`)
      } else {
        alert(`${data.token}`)
        await auth.clearToken()
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    // const { loginWithRedirect } = useAuth0();
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
      <Translation>{t=>
      <Container style={{ height: "100vh" }} >
        <Row className="p-5" style={{ height: '100%', alignItems: 'center', justifyContent: 'center' }}>
          <Col>
            <Form {...formItemLayout} onSubmit={this.handleSubmit} className="login-form">
              <div style={{ textAlign: 'center', fontSize: '48px', padding: '10px' }}>{t('login_page.login')}</div>
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
                {t('login_page.forgot')}
                </a>
                <Button type="primary" htmlType="submit" className="login-form-button">
                {t('login_page.login')}
                </Button>

                {/* <LoginFB/> */}

                <div style={{ }}>
                <FacebookLogin
                  appId="794785114267927"
                  autoLoad={false}
                  fields="name,email,picture"
                  callback={this.callbackFB}
                  
                  // cssClass="kep-login-facebook kep-login-facebook-[small]"
                  icon="fa-facebook"
                  size="small"
                // render={renderProps => (
                //   <Button  type="primary" onClick={renderProps.onClick}>Loginss with Facebook</Button>
                // )}

                />
                </div>
                {t('login_page.or')} <a href="/register">{t('login_page.register')} !</a>
              </Form.Item>

            </Form>
            {/* <Row><Col><div style={{ }}>
                <FacebookLogin
                  appId="794785114267927"
                  autoLoad={false}
                  fields="name,email,picture"
                  callback={this.callbackFB}
                  
                  // cssClass="kep-login-facebook kep-login-facebook-[small]"
                  icon="fa-facebook"
                  size="small"
                // render={renderProps => (
                //   <Button  type="primary" onClick={renderProps.onClick}>Loginss with Facebook</Button>
                // )}

                />
                </div>
                Or <a href="/register">register now!</a></Col></Row> */}
          </Col>
        </Row>
        {/* <div>
          <button onClick={() => loginWithRedirect({})}>Log in with Facebook</button>
        </div> */}


        {/* <Row>
          <Col> */}
        {/* </Col>
        </Row> */}
      </Container>
      }
      </Translation>
    )
  }
}
export default withRouter(Form.create({ name: 'login' })(Login));
