import React, { Component } from 'react'
import { Container, Row, Col, Form, FormGroup, Label } from 'reactstrap'
import { Button, Card, Tag, Input, Pagination, Typography, Icon } from 'antd'
import axios from 'axios'
import url from '../url_config'
import { Link } from 'react-router-dom'
import './AllSaleLand.css'
import Iframe from 'react-iframe'

import Moment from 'react-moment'
import auth from "../service/index"
const { Meta } = Card;
const { Search } = Input;
const { Text } = Typography;

export default class AllSaleLand extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      total: 0,
      current: 1,
      start_price: 0,
      end_price: 0,
      find: '',
      check: true
    };
  }


  componentDidMount = () => {
    this.getFirst(1)
  }


  getFirst = async (page_number) => {
    this.setState({ check: true })
    await axios.get(`${url}/lands/filter/0`).then(async res => {
      const { data } = res
      this.setState({ data: data.result });
      console.log("first : ", data);
      await this.setState({ total: data.total })
      await this.setState({
        current: 1,
      });
    })
  }

  getData = async (page_number, start_price, end_price) => {
    console.log("Start : ", start_price);
    console.log("End : ", end_price);
    await axios.get(`${url}/lands/filter/${page_number - 1}/price/${start_price}/${end_price}`).then(async res => {
      const { data } = res
      this.setState({ data: data.result });
      console.log("Data : ", data);
      await this.setState({ total: data.total })
    })
  }

  formatNumber = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  onChange = async page => {
    console.log("Page Change : ", page);
    await this.setState({
      current: page,
    });
    if (this.state.check === true) {
      await this.getData(this.state.current, this.state.start_price, this.state.end_price)
    }
    else {
      this.findData(this.state.find, this.state.current)
      await this.setState({
        current: page,
      });
    }

  };

  handleInputChange = e => {
    const { name, value } = e.target
    this.setState({ [name]: value })
    console.log({ [name]: value })
    if (e.target.value === "") {
      this.setState({ [name]: 0 })
    }

  }

  findData = async (find, page) => {
    console.log("FindData : ", find);
    console.log("Find Page : ", page);
    this.setState({ check: false })
    this.setState({ find: find })

    await axios.get(`${url}/lands/find/${find}/${page - 1}`).then(async res => {
      const { data } = res
      this.setState({ data: data.result });
      console.log("Find Data : ", data);
      await this.setState({ total: data.total })

    })
  }

  searchPrice = async () => {
    console.log("search ");
    await this.setState({
      current: 1,
    });
    await this.setState({ check: true })
    await this.getData(this.state.current, this.state.start_price, this.state.end_price)

  }

  createLand = e => {
    let user = auth.getToken()
    console.log("userCheck : ", user);
    if (user != null) {
      let userDecoded = auth.decodeToken(user)
      let userId = userDecoded.id
      let userFirstName = userDecoded.firstname
      let userLastName = userDecoded.lastname
      this.props.history.push(`/createLand`)
    } else {
      alert("Please Login !")
      this.props.history.push(`/login`)
    }
  }
  render() {
    // const urlImage = "http://127.0.0.1:3001/"
    const urlImage = "http://167.71.193.2:3001/"
    const urlSaleLand = "saleLand/"


    return (
      <Container className="">
        <Row>
          {/* <Col lg={{ size: 8, offset: 2 }} md={{ size: 10, offset: 1 }} sm={{ size:12}}> */}
          <Col md={12}>
            <div className="p-5">

              <Row>
                <Col md={6}>
                  <div className="">
                    <h3>ขายที่ดิน (ทั้งหมด)</h3>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="">
                    <Search placeholder="ค้นหา" onSearch={value => this.findData(value, 1)} style={{ backgroundColor: '#f90 !important' }} />
                  </div>
                </Col>
              </Row>



              <Row className="pt-4 pb-4">
                <Col md={4}>
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} >
                    <Iframe url="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2F%25E0%25B8%259A%25E0%25B8%25A3%25E0%25B8%25B4%25E0%25B8%25A9%25E0%25B8%25B1%25E0%25B8%2597-%25E0%25B8%25A5%25E0%25B8%25AD%25E0%25B8%25A7%25E0%25B9%258C-%25E0%25B9%2581%25E0%25B8%25AD%25E0%25B8%2599%25E0%25B8%2594%25E0%25B9%258C-%25E0%25B9%2581%25E0%25B8%25AD%25E0%25B8%25AA%25E0%25B9%2580%25E0%25B8%258B%25E0%25B8%2597-%25E0%25B8%2588%25E0%25B8%25B3%25E0%25B8%2581%25E0%25B8%25B1%25E0%25B8%2594-219129021946485%2F&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=794785114267927"
                      // position="absolute"
                      width="100%"
                      style={{ overflow: 'hidden' }}
                      id="myId"
                      // className="myClassname"
                      height="370px"
                      frameBorder="0" />
                  </div>
                </Col>

                <Col md={8}>

                  <div className="p-3" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <Row>
                      <Col md={12}>
                        <div className="p-4" style={{ backgroundColor: '#f90' }}>
                          <Form>
                            <Label style={{ fontSize: '24px', color: '#fff' }}><Icon type="search" style={{ fontSize: '30px', marginRight: '10px' }} />ค้นหาตามช่วงราคา </Label>
                            <Row form>
                              <Col md={4}>
                                <FormGroup>
                                  <Input type="number" name="start_price" onChange={this.handleInputChange} placeholder="1,000,000" />
                                </FormGroup>
                              </Col>
                              <Col md={4}>
                                <FormGroup>
                                  <Input type="number" name="end_price" onChange={this.handleInputChange} placeholder="2,000,000" />
                                </FormGroup>
                              </Col>
                              <Col md={4}>
                                {((parseInt(this.state.start_price) <= parseInt(this.state.end_price)) && parseInt(this.state.end_price) >= parseInt(this.state.start_price)) && <FormGroup>
                                  <Button onClick={this.searchPrice} outline="true" color="primary">ค้นหา</Button>
                                </FormGroup>}

                                {(parseInt(this.state.end_price) < parseInt(this.state.start_price)) && <FormGroup>
                                  <Button outline="true" disabled>ค้นหา</Button>
                                </FormGroup>}
                              </Col>

                            </Row>
                            <FormGroup>
                              <Button onClick={this.getFirst} className="mr-3" outline="true" color="sucess">ค้นหาทั้งหมด</Button>


                              <Button outline="true" onClick={this.createLand} icon="check" color="primary">สร้างประกาศ</Button>

                            </FormGroup>
                          </Form>

                        </div>
                      </Col>
                    </Row>

                    {((this.state.end_price < this.state.start_price)) && <Row>
                      {/* <Col><h5>ตั้งแต่ {this.formatNumber(this.state.start_price)} ถึง {this.formatNumber(this.state.end_price)} บาท</h5></Col> */}
                      <Col><Text type="danger">กรุณาตรวจสอบช่วงของราคา</Text></Col>
                    </Row>}

                  </div>

                </Col>
              </Row>

              <Row>
                <Col>
                  <div style={{ textAlign: 'center' }} className="pt-4 pb-4">
                    <h1>ประกาศ</h1>
                  </div>
                </Col>
              </Row>

              <Row>
                {
                  this.state.data.map(e => {
                    return (
                      <Col md={4} key={e.id}>
                        <div className="mt-2 mb-2">
                          <Link to={`${urlSaleLand}${e.id}`}>

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
                                </div>
                                {/* <div className="p-2">
                                <Link to={`${urlSaleLand}${e.id}`}> อ่านต่อ. . . </Link>
                              </div> */}
                              </div>
                            </Card>
                          </Link>
                        </div>
                      </Col>
                    )
                  })
                }

              </Row>
              <Pagination current={this.state.current} pageSize={12} onChange={this.onChange} total={this.state.total} />
            </div>
          </Col>
        </Row>
      </Container>
    )
  }
}