import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { Button, Card, Tag, Select, Form, Pagination,Icon } from 'antd'
import axios from 'axios'
import url from '../url_config'
import { Link } from 'react-router-dom'
import './AllArticle.css'
import Moment from 'react-moment'
import { Translation } from 'react-i18next';
const { Meta } = Card;
const { Option } = Select;
export default class AllArticle extends Component {
  state = {
    data: [],
    text: 'ทั้งหมด',
    value: 0,
    current: 1,
    total: 0
  }
  componentDidMount = () => {
    // this.getData(0,1)
    this.getFilter(0, 1)
  }

  // getData = async (value, page) => {
  //   await axios.get(`${url}/blogs/filter/${value}/${page - 1}`).then(async res => {
  //     const { data } = res
  //     await this.setState({ data });
  //     console.log("DataImage : ", data);
  //     await this.setState({ total: data.length })
  //     console.log("First Total : ", this.state.total);


  //   })
  // }
  
  getFilter = async (value, page_number) => {
    console.log("Log Filter : ", value)
    console.log("Log Page : ", page_number);

    await axios.get(`${url}/blogs/filter/${value}/${page_number - 1}`).then(async res => {
      const { data } = res
      await this.setState({ data: data.result });
      console.log("DataFilter : ", data);
      await this.setState({ total: data.total })
      console.log("lenght : ",this.state.total)

      // if ((lenght <= 15) && (page_number==2)){
      //   await this.setState({
      //     current: page_number,
      //   });
      // }else{
      //   await this.setState({ total: lenght })
      //   await this.setState({
      //     current: 1,
      //   });
      // }
    })
  }

  filter = async (value, event) => {
    console.log("filter income : ", value);

    // this.onPageChange(1)
    if (value == 0) {
      await this.setState({ value: 0 })
      this.setState({ text: 'ทั้งหมด' })
      this.getFilter(this.state.value, 1)
    } else if (value == 1) {
      await this.setState({ value: 1 })
      this.setState({ text: 'ข่าว' })
      this.getFilter(this.state.value, 1)
    }
    else if (value == 2) {
      await this.setState({ value: 2 })
      this.setState({ text: 'บทความ' })
      this.getFilter(this.state.value, 1)
    }
    else {
      await this.setState({ value: 3 })
      this.setState({ text: 'กิจกรรม' })
      this.getFilter(this.state.value, 1)
    }
    console.log("Filter : ", this.state.value);
  }

  onChange = async page => {
    console.log("Page Change : ", page);
    await this.setState({
      current: page,
    });
    this.getFilter(this.state.value, this.state.current)
  };

  render() {
    // const urlImage = "http://127.0.0.1:3013/"

    const urlImage = "https://www.chamnangroup.com/"
    const urlArticle = "article/"
    return (<Translation>{t=>
      <Container className="">
        <Row>
          {/* <Col lg={{ size: 8, offset: 2 }} md={{ size: 10, offset: 1 }} sm={{ size:12}}> */}
          <Col md={12}>
            <div className="p-5">
              <h3>{t('all_article_page.title')}</h3>
              <Row>
                <Col md={12}>
                  <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                    <div>
                      <Form >
                        <Select onSelect={(value, event) => this.filter(value, event)} placeholder="กรุณาเลือกประเภทของบทความ !" defaultValue={0}>
                          <Option value={0}>{t('all_article_page.all')}</Option>
                          <Option value={1}>{t('all_article_page.news')}</Option>
                          <Option value={2}>{t('all_article_page.article')}</Option>
                          <Option value={3}>{t('all_article_page.activity')}</Option>
                        </Select>
                      </Form>
                    </div>
                  </div>
                </Col>
              </Row>

              <Row>

                {
                  this.state.data.map(e => {
                    console.log("type : ", typeof(e.type));
                    
                    // if (e.type === 1) {
                    //   e.type = "ข่าว"
                    // } else if (e.type === 2) {
                    //   e.type = "บทความ"
                    // } else {
                    //   e.type = "กิจกรรม"
                    // }
                    
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
                                // description={e.detail}
                              />
                              <div className="read-more">
                                <div className="p-2">
                                  <Tag color="#f90">อ่านแล้ว {e.view}</Tag>
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
              <Pagination current={this.state.current} pageSize={15} onChange={this.onChange} total={this.state.total} />
            </div>

          </Col>
        </Row>
      </Container>}
      </Translation>
    )
  }
}
