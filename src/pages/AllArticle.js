import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { Button, Card, Tag, Select, Form, Pagination } from 'antd'
import axios from 'axios'
import url from '../url_config'
import { Link } from 'react-router-dom'
import './AllArticle.css'
import Moment from 'react-moment'
const { Meta } = Card;
const { Option } = Select;
export default class AllArticle extends Component {
  state = {
    data: [],
    text:'ทั้งหมด',
    value:0,
    current:1,
    total:0
  }
  componentDidMount = () => {
    this.getData()
  }

  getData = async () => {
    await axios.get(`${url}/blogs/filter/0/0`).then(res => {
      const { data } = res
      this.setState({ data });
      console.log("DataImage : ", data);
      this.setState({ total:data.length})

    })
  }
  getFilter = async (value,page_number) => {
    await axios.get(`${url}/blogs/filter/${value}/${page_number}`).then(res => {
      const { data } = res
      this.setState({ data });
      console.log("DataFilter : ", data);

    })
  }

  filter = (value, event) => {
    this.getFilter(value)
    if(value == 0){
      this.setState({ value:0 })
      this.setState({ text:'ทั้งหมด'})
    }else if(value == 1){
      this.setState({ value:1})
      this.setState({ text:'ข่าว'})
    }
    else if(value == 2){
      this.setState({ value:2 })
      this.setState({ text:'บทความ'})
    }
    else{
      this.setState({ value:3 })
      this.setState({ text:'กิจกรรม'})
    }
    console.log("filter : ", value);
  }

  onPageChange=(value)=>{
    console.log('PageChange : ', value);
    this.getFilter(this.state.value,value-1)
  }

  render() {
    const urlImage = "http://167.71.193.2:3001/"
    // const urlImage = "http://127.0.0.1:3001/"
    const urlArticle = "article/"
    return (
      <Container className="">
        <Row>
          {/* <Col lg={{ size: 8, offset: 2 }} md={{ size: 10, offset: 1 }} sm={{ size:12}}> */}
          <Col md={12}>
            <div className="p-5">
              <h3>ข่าว / บทความ / กิจกรรม ({this.state.text})</h3>
              <Row>
                <Col md={12}>
                  <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                    <div>
                      <Form >
                        <Select onSelect={(value, event) => this.filter(value, event)} placeholder="กรุณาเลือกประเภทของบทความ !" defaultValue="0">
                          <Option value="0">ทั้งหมด</Option>
                          <Option value="1">ข่าว</Option>
                          <Option value="2">บทความ</Option>
                          <Option value="3">กิจกรรม</Option>
                        </Select>
                      </Form>
                    </div>
                  </div>
                </Col>
              </Row>

              <Row>

                {
                  this.state.data.map(e => {
                    if (e.type == 1) {
                      e.type = "ข่าว"
                    } else if (e.type == 2) {
                      e.type = "บทความ"
                    } else {
                      e.type = "กิจกรรม"
                    }
                    return (
                      <Col md={4} key={e.id}>
                        <div className="mt-2 mb-2">
                          <Link to={`${urlArticle}${e.id}`}>
                            <Card
                              hoverable
                              style={{ width: '100%', height: '100%' }}
                              cover={<img alt="example" src={`${urlImage}${e.image}`} width="100%" height="200px" />}
                            >
                              <Meta
                                title={e.title}
                                description={e.detail}
                              />
                              <div className="read-more">
                                <div className="p-2">
                                  <Tag color="#f90">
                                    {e.type}
                                  </Tag>
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
              <Pagination defaultCurrent={1} defaultPageSize={10} total={this.state.total} onChange={this.onPageChange}/>
            </div>

          </Col>
        </Row>
      </Container>
    )
  }
}
