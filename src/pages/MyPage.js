import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap';
import { Button, Form, Card, Tag, Input, Pagination, Typography, Icon, Modal, Select, notification, Popover } from 'antd'
import axios from 'axios'
import url from '../url_config'
import auth from "../service/index"
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
const { Meta } = Card;
const { Search } = Input;
const { Text } = Typography;
const { Option } = Select;

class MyPage extends Component {
  state = {
    dataLand: [],
    user: '',
    check: false,
    visible: false,
    visible2: false,
    userId: '',
    profile: {}
  }
  componentDidMount = e => {
    let user = auth.getToken()
    if (user != null) {
      let userDecoded = auth.decodeToken(user)
      let userId = userDecoded.id
      let userFirstName = userDecoded.firstname
      let userLastName = userDecoded.lastname
      this.setState({ userId: userId })
      this.mySaleLand(userId)
      this.profile(userId)
      this.setState({ user: userFirstName + ' ' + userLastName })
    } else {
      this.props.history.push(`/`)
    }
  }
  mySaleLand = async (userId) => {
    await axios.get(`${url}/lands/myLand/${userId}`).then(async res => {
      const { data } = res
      console.log("Data My Land : ", res.data);
      await this.setState({ dataLand: data });
      if (res.data.length === 0) {

        console.log("empty");
      } else {
        this.setState({ check: true })
        console.log("not empty", res.data);

      }

    })
  }
  profile = async (userId) => {
    await axios.get(`${url}/users/${userId}`).then(async res => {
      const { data } = res
      console.log("Data User : ", res.data);
      this.props.form.setFieldsValue({
        firstname: data.firstname,
        lastname: data.lastname,
        tel: data.tel,
        // email: data.email
      })
      await this.setState({ profile: data });

    })
  }

  formatNumber = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  showModal2 = () => {
    this.setState({
      visible2: true,
    });
  };



  handleOk = async e => {
    // e.preventDefault();
    await this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        values.id = this.state.userId
        console.log('Received values of form: ', values);
        await axios.put(`${url}/users/edit`, values).then(async res => {
          const { data } = res
          console.log("UserEdited : ", res.data);
          if (data.message === true) {
            await this.profile(this.state.userId)
            this.openNotificationWithIcon('success')
          } else {
            console.log('else');
            this.openNotificationWithIcon('error')
          }
        })

      }
    });

    this.setState({
      visible: false,
    });
  };

  handleOk2 = async (landsId) => {
    // e.preventDefault();
    await axios.delete(`${url}/lands/${landsId}`).then(async res => {
      const { data } = res
      console.log("Post Delete : ", res.data);
      if (data.message === true) {
        this.openNotificationDelete('success')
        await this.mySaleLand(this.state.userId)
      } else {
        console.log('else');
        this.openNotificationDelete('error')
      }
    })
 
  };

  openNotificationDelete = (type, landId, landLevel) => {
    console.log(type);

    if (type == 'success') {
      notification[type]({
        message: `Delete !`,
        description:
          `Deleted`,
      });
    } else {
      notification[type]({
        message: 'Error',
        description:
          'Error can not Delete.',
      });
    }

  };

  openNotificationWithIcon = (type, landId, landLevel) => {
    console.log(type);

    if (type == 'success') {
      notification[type]({
        message: `Update !`,
        description:
          `Updated Profile`,
      });
    } else {
      notification[type]({
        message: 'Error',
        description:
          'Error can not Update.',
      });
    }

  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel2 = e => {
    console.log(e);
    this.setState({
      visible2: false,
    });
  };


  render() {
    // const urlImage = "http://127.0.0.1:3013/"

    const urlImage = "https://www.chamnangroup.com/"

    const urlSaleLand = "saleLand/"
    const urlEditSaleLand = "editSaleLand/"

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
      <Container style={{}}>
        <Row>
          <Col>
            <div className="mt-5 mb-3">
              <h3>ยินดีต้อนรับคุณ {this.state.profile.firstname} {this.state.profile.lastname} <Icon type="form" onClick={this.showModal} style={{ color: 'red' }} /></h3></div>
            <div>
              <Modal
                title="Edit Profile"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
              >
                <Container>
                  <Row className="p-3">
                    <Col>
                      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                        <Form.Item
                          label={
                            <span>
                              Firstname&nbsp;
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
                              Lastname&nbsp;
              </span>
                          }
                        >
                          {getFieldDecorator('lastname', {
                            rules: [{ required: true, message: 'Please input your lastname!', whitespace: true }],
                          })(<Input />)}
                        </Form.Item>

                        {/* <Form.Item label="E-mail">
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
                        </Form.Item> */}

                        <Form.Item label="Phone Number">
                          {getFieldDecorator('tel', {
                            rules: [{ required: true, message: 'Please input your phone number!' }],
                          })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} placeholder="83176xxxx" />)}
                        </Form.Item>

                      </Form>
                    </Col>
                  </Row>
                </Container>
              </Modal>
            </div>
          </Col>
        </Row>
        <div className="p-5">
          <h4>โพสต​์การขายที่ดินของคุณ</h4>
          <Row >
            {
              this.state.check && this.state.dataLand.map(e => {
                return (
                  <Col md={4} key={e.id}>
                    <div className="mt-2 mb-2">
                      {/* <Link to={`${urlSaleLand}${e.id}`}> */}

                      <Card
                        hoverable
                        style={{ width: '100%', height: '100%' }}
                        cover={<img alt="example" src={`${urlImage}${e.image}`} width="100%" height="200px" />}
                      >
                        <Meta
                          title={e.title}
                          // description={e.detail}
                        />
                        <div color="#f90">
                          ราคา {this.formatNumber(e.price)} บาท
                                  </div>
                        <div className="">
                          <div className="p-2">
                            <Tag color="#f90">เข้าชมแล้ว {e.view}</Tag>
                            <Tag color="#f90"><Moment format="DD/MM/YYYY">{e.created}</Moment></Tag>
                            <div className="d-flex">
                              <div><Link to={`${urlSaleLand}${e.id}`}><Icon type="search" style={{ fontSize: '20px', padding: '10px', color: 'blue' }} /></Link></div>
                              <div><Link to={`${urlEditSaleLand}${e.id}`}><Icon type="edit" style={{ fontSize: '20px', padding: '10px', color: 'red' }} /></Link></div>
                              <div>
                              <Icon type="delete" onClick={() => this.handleOk2(e.id)} style={{ fontSize: '20px', padding: '10px', color: 'red' }} />
                              </div>
                            </div>
                          </div>
                        </div>

                      </Card>
                      {/* </Link> */}
                    </div>
                  </Col>
                )
              })
            }
            {
              !this.state.check && <div>
                <Col md={12} >
                  <div className="mt-2 mb-2" style={{ height: '600px', }}><h6>คุณยังไม่มีโพสต์การขาย</h6>
                    <Link to='/createLand'><Icon type="plus-circle" /> คลิกเพื่อสร้าง
                    </Link>
                  </div>
                </Col>
              </div>
            }
          </Row>
        </div>
      </Container>
    )
  }
}
export default Form.create()(MyPage);