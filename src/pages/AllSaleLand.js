import React, { Component } from 'react'
import { Container, Row, Col, Form, FormGroup, Label } from 'reactstrap'
import { Button, Card, Tag, Input, Pagination, Typography } from 'antd'
import axios from 'axios'
import url from '../url_config'
import { Link } from 'react-router-dom'
import './AllSaleLand.css'
import Iframe from 'react-iframe'

import Moment from 'react-moment'

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
    };
  }


  componentDidMount = () => {
    this.getFirst(1)
  }


  getFirst = async (page_number) => {
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
    await this.getData(this.state.current, this.state.start_price, this.state.end_price)

  };

  handleInputChange = e => {
    const { name, value } = e.target
    this.setState({ [name]: value })
    console.log({ [name]: value })
    if(e.target.value === ""){
      this.setState({ [name]: 0  })
    }
  }

  searchPrice=async ()=> {
      console.log("search ");
      await this.setState({
        current: 1,
      });
      await this.getData(this.state.current, this.state.start_price, this.state.end_price)
  }

  render() {
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
                    <Search placeholder="ค้นหา" onSearch={value => console.log(value)} enterButton />
                  </div>
                </Col>
              </Row>



              <Row className="pt-4 pb-4">
                <Col md={4}>
                  <div >
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

                  <div className="p-3" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
                    <Row>
                      <Col md={12}>
                        <Form>
                          <Label style={{ fontSize: '18px' }}>ค้นหาตามช่วงราคา </Label>
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
                              {(( parseInt(this.state.start_price) <= parseInt(this.state.end_price)) && parseInt(this.state.end_price) >= parseInt(this.state.start_price)) && <FormGroup>
                                <Button onClick={this.searchPrice} outline="true" color="primary">ค้นหา</Button>
                              </FormGroup>}

                              {(parseInt(this.state.end_price) < parseInt(this.state.start_price)) && <FormGroup>
                                <Button outline="true" disabled>ค้นหา</Button>
                              </FormGroup>}

                              {/* {(this.state.start_price==0 && this.state.end_price ==0 ) && <FormGroup>
                                <Button onClick={this.getFirst} outline="true" color="primary">ทั้งหมด</Button>
                              </FormGroup>} */}
                            </Col>

                          </Row>
                          <FormGroup>
                                <Button onClick={this.getFirst} outline="true" color="primary">ค้นหาทั้งหมด</Button>
                              </FormGroup>
                        </Form>
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
                                description={e.detail}
                              />
                              <div className="">
                                <div className="p-2">

                                  <div color="#f90">
                                    ราคา {this.formatNumber(e.price)} บาท
                                  </div>
                                  {/* <div color="#f90">created at <Moment format="DD/MM/YYYY">{e.created}</Moment></div> */}
                                </div>

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

// <Container className="">
      //   <Row>
      //     <Col lg={{ size: 8, offset: 2 }} md={{ size: 10, offset: 1 }} sm={{ size:12}}>
      //       <div className="p-5">
      //     <h3>ขายที่ดิน (ทั้งหมด)</h3>
      //         {/* <div className="card-all-sale-land mt-5 mb-5 p-3">
      //         <Link to="/allSaleLand">
      //             <Row>
      //               <Col md={4}>
      //                 <div><img src="https://www.posttoday.com/media/content/2019/01/13/5A26EAFFE18E41C4983ECB5237BB1598.jpg" className="img-fluid" alt="test" style={{ maxHeight: '250px', width: '100%' }} /></div>
      //               </Col>
      //               <Col md={8}>
      //                 <div className="d-flex card-all-sale-land-text">
      //                   <div>
      //                     <h5>ขายที่ดินจังหวัดตรัง</h5>
      //                   </div>
      //                   <div>
      //                     <h6>ขายที่ดิน 30 ไร่ อำเภอสิเกา จังหวัดตรัง</h6>
      //                   </div>
      //                   <div>
      //                     <h6>ราคา 1,000,000 บาท</h6>
      //                   </div>
      //                 </div>
      //               </Col>
      //             </Row>
      //           </Link>
      //         </div> */}

      //         {
      //           this.state.data.map(e => {
      //             return (
      //               <div key={e.id} className="card-all-sale-land mt-5 mb-5 p-3">
      //                 <Link to={`${urlSaleLand}${e.id}`}>
      //                   <Row>
      //                     <Col md={6}>
      //                       <div class=""><img src={`${urlImage}${e.image}`} className="img-fluid" alt="test" style={{ height: '100%', width: '100%' }} /></div>
      //                     </Col>
      //                     <Col md={6}>
      //                       <div className="d-flex card-all-sale-land-text">
      //                         <div>
      //                           <h5>{e.title}</h5>
      //                         </div>
      //                         <div>
      //                           <h6>{e.detail}</h6>
      //                         </div>
      //                         <div>
      //                           <h6>ราคา {e.price} บาท</h6>
      //                         </div>
      //                       </div>
      //                     </Col>
      //                   </Row>
      //                 </Link>
      //               </div>
      //             )
      //           })
      //         }
      //       </div>
      //     </Col>
      //   </Row>
      // </Container>