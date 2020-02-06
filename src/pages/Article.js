import React, { Component } from 'react'
import axios from 'axios'
import url from '../url_config'
import { Container, Row, Col } from 'reactstrap';
import Moment from 'react-moment'
export default class Article extends Component {
  state = {
    data: {}
  }
  // handleMarkerClick = () => {
  //   this.setState({ isMarkerShown: false })
  //   this.delayedShowMarker()
  // }

  componentDidMount = () => {
    this.getData()
  }

  getData = async () => {

    await axios.get(`${url}/blogs/${this.props.match.params.id}`).then(res => {
      const { data } = res

      this.setState({ data });
      console.log("Data : ", data);

    })
  }
  render() {
    // const urlImage = "http://127.0.0.1:3001/"
    const urlImage = "http://167.71.193.2:3001/"
    return (
      <Container className="pt-5 pb-5">
        <Row>
          <Col md={{ size: 8, offset: 2 }}>
            <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
              <div>
                <h6>ประกาศ ณ วันที่ <Moment format="DD/MM/YYYY">{this.state.data.created}</Moment></h6>
              </div>
            </div>
          </Col>
        </Row>

        <Row>
          <Col md={{ size: 8, offset: 2 }}>
            <div style={{ display: 'flex', flexDirection: 'row-reverse',paddingTop:'10px' }}>
              <div>
                <h6>อ่านแล้ว {this.state.data.view}</h6>
              </div>
            </div>
          </Col>
        </Row>

        <Row>
          <Col md={{ size: 8, offset: 2 }}>
            <div className="p-4 m-4" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <img src={`${urlImage}${this.state.data.image}`} className="img-fluid logo-company" style={{ maxHeight: '600px' }} />
            </div>
          </Col>
        </Row>

        <Row>
          <Col md={{ size: 8, offset: 2 }}>
            <div style={{ textAlign: 'center', }}><h4>{this.state.data.title}</h4></div>
          </Col>
        </Row>

        <Row>
          <Col md={{ size: 8, offset: 2 }}>
            <div className="p-4" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <div className="p-3 text-company" style={{ textIndent: '12%' }}>
                <h5>{this.state.data.detail}</h5>
              </div>
            </div>
          </Col>
        </Row>

      </Container>
    )
  }
}
