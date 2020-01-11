import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { Button, Card, Tag } from 'antd'
import axios from 'axios'
import url from '../url_config'
import { Link } from 'react-router-dom'
import './AllArticle.css'
import Moment from 'react-moment'
const { Meta } = Card;

export default class AllArticle extends Component {
  state = {
    data: []
  }
  componentDidMount = () => {
    this.getData()
  }

  getData = async () => {

    await axios.get(`${url}/blogs`).then(res => {
      const { data } = res
      this.setState({ data });
      console.log("DataImage : ", data);

    })
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
              <h3>ข่าว/บทความ/กิจกรรม (ทั้งหมด)</h3>
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
            </div>

          </Col>
        </Row>
      </Container>
    )
  }
}
