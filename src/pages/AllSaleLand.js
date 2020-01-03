import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { Button, Card } from 'antd'
import axios from 'axios'
import url from '../url_config'
import { Link } from 'react-router-dom'
import './AllSaleLand.css'
export default class AllSaleLand extends Component {
  state = {
    data: []
  }
  componentDidMount = () => {
    this.getImage()
  }

  getImage = async () => {

    await axios.get(`${url}/lands`).then(res => {
      const { data } = res
      this.setState({ data });
      console.log("DataImage : ", data);

    })
  }
  render() {
    const urlImage = "http://localhost:3001/"
    const urlSaleLand = "saleLand/"
    return (
      <Container className="">
        <Row>
          <Col>
            <div className="p-5">
            <h3>ขายที่ดิน (ทั้งหมด)</h3>
              {
                this.state.data.map(e => {
                  return (
                    <div key={e.id} className="card-all-sale-land mt-5 mb-5 p-3">
                      <Link to={`${urlSaleLand}${e.id}`}>
                        <Row>
                          <Col md={4}>
                            <div><img src={`${urlImage}${e.image}`} className="img-fluid" alt="test" style={{ maxHeight: '250px', width: '100%' }} /></div>
                          </Col>
                          <Col md={8}>
                            <div className="d-flex card-all-sale-land-text">
                              <div>
                                <h5>{e.title}</h5>
                              </div>
                              <div>
                                <h6>{e.detail}</h6>
                              </div>
                              <div>
                                <h6>ราคา {e.price} บาท</h6>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </Link>
                    </div>
                  )
                })
              }
            </div>
          </Col>
        </Row>
      </Container>
    )
  }
}
