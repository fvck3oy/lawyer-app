import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { Button, Card } from 'antd'
import axios from 'axios'
import url from '../url_config'
import { Link } from 'react-router-dom'
import './AllArticle.css'

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
    const urlSaleLand = "saleLand/"
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
                    return (
                      <Col md={4}>
                        <div className="mt-2 mb-2">
                          <Card
                            hoverable
                            style={{ width: '100%'}}
                            cover={<img alt="example" src={`${urlImage}${e.image}`} />}
                          >
                            <Meta 
                              title={e.title} 
                              // description={e.detail} 
                            />
                            <Link to={`${urlSaleLand}${e.id}`}>อ่านต่อ..</Link>
                          </Card>
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
