import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap';
import { Button, Card, Tag, Input, Pagination, Typography, Icon } from 'antd'
import axios from 'axios'
import url from '../url_config'
import auth from "../service/index"
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
const { Meta } = Card;
const { Search } = Input;
const { Text } = Typography;
export default class MyPage extends Component {
  state = {
    dataLand: [],
    user: '',
    check: false
  }
  componentDidMount = e => {
    let user = auth.getToken()
    if (user != null) {
      let userDecoded = auth.decodeToken(user)
      let userId = userDecoded.id
      let userFirstName = userDecoded.firstname
      let userLastName = userDecoded.lastname
      this.mySaleLand(userId)
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

  formatNumber = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }


  render() {
    const urlImage = "http://127.0.0.1:3001/"
    // const urlImage = "http://167.71.193.2:3001/"
    const urlSaleLand = "saleLand/"
    const urlEditSaleLand = "editSaleLand/"
    return (
      <Container style={{}}>
        <Row>
          <Col>
            <div className="mt-5 mb-3"><h3>ยินดีต้อนรับคุณ {this.state.user}</h3></div>
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
                          <div color="#f90">
                            ราคา {this.formatNumber(e.price)} บาท
                                  </div>
                          <div className="">
                            <div className="p-2">
                              <Tag color="#f90">เข้าชมแล้ว {e.view}</Tag>
                              <Tag color="#f90"><Moment format="DD/MM/YYYY">{e.created}</Moment></Tag>
                              
                              <Link to={`${urlSaleLand}${e.id}`}><Icon type="search" style={{ fontSize:'20px', padding:'10px',color:'blue'}} /></Link>
                              <Link to={`${urlEditSaleLand}${e.id}`}><Icon type="edit" style={{ fontSize:'20px',padding:'5px',color:'red'}} /></Link>
                            </div>
                          </div>
                        </Card>
                      </Link>
                    </div>
                  </Col>
                )
              })
            }
            {
              !this.state.check && <div>
                <Col md={12} >
                  <div className="mt-2 mb-2" style={{ height:'600px',}}><h6>คุณยังไม่มีโพสต์การขาย</h6>
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
