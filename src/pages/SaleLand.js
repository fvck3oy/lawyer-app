import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap';
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import Map from '../components/ShowMap/ShowMap'
import PictureSaleLands from '../components/PictureSaleLands/PictureSaleLands';
import AddMarker from '../components/addMarker'
import LineContact from '../components/LineContact/LineContact';

export default class SaleLand extends Component {
  state = {
    isMarkerShown: false,
  }
  // handleMarkerClick = () => {
  //   this.setState({ isMarkerShown: false })
  //   this.delayedShowMarker()
  // }
  render() {
    return (
      <div>
        <Container>
          <Row className="m-3">
            <Col>
              <div className="d-flex">
                <div>Filter</div>
                <div><input /></div>
              </div>

            </Col>
          </Row>

          <Row>
            <Col>
              <div className="mt-2 mb-2">เลขที่ประกาศ 0-0001</div>
            </Col>
          </Row>
          <Row className="ml-2"><Col><div className="mt-2 mb-2">อัพเดทล่าสุดวันที่ 20-08-2562 15:20</div></Col></Row>
          <Row>
            <Col><div className="mt-2 mb-2 p-4">
              <Map
                isMarkerShown={this.state.isMarkerShown}
                // onMarkerClick={this.handleMarkerClick}
              /></div>
            </Col>
          </Row>

          <Row>
            <Col><AddMarker /></Col>
          </Row>

          <Row><Col><div className="mt-2 mb-2">ขายที่ดิน 16 ไร่ เขตสาคร กทม. ราคา 15,000,000 บาท (สนใจติดต่อ)</div></Col></Row>
          <Row><Col><div className="mt-2 mb-2"><PictureSaleLands /></div></Col></Row>
          <Row><Col><div className="mt-2 mb-2">รายละเอียด</div></Col></Row>

          <Row>
            <Col><div className="mt-2 mb-2 ml-3">
              ราคาพิเศษเฉพาะงานประมูลขายบ้านมือสอง (รวมที่ดินเปล่า) ธอส. ครั้งที่ 4/2562 ในวันเสาร์ที่ 14 ธันวาคม 2562 โดยเปิดให้ลงชื่อเข้าร่วมประมูลตั้งแต่เวลา 8.00 น.
                         เป็นต้นไป และเริ่มทำการประมูลตั้งแต่เวลา 10.00 - 16.00 น. ณ ห้องประชุมพิมานมาศ อาคารจอดรถ ชั้น 11 ธนาคารอาคารสงเคราะห์ สำนักงานใหญ่(ทรัพย์ลำดับที่ 24)</div>
            </Col>
          </Row>

          <LineContact />
        </Container>
      </div>
    )
  }
}
