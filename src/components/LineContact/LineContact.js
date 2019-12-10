import React, { Component } from 'react'
import { Col, Row } from "reactstrap";
import qrLine from '../../images/qr_line.jpg'
export default class LineContact extends Component {
  render() {
    return (
      <Row>
        <Col md={3} className="d-flex justify-content-center align-items-center"><div><img src={qrLine} className="img-fluid" alt={qrLine} /></div></Col>
        <Col md={9} className="p-5" style={{alignItems:'center', display:'flex'}}>ชำนาญกรุ๊ป เลขที่ตั้ง 200/94 ซอยนวลจันทร์ 9 เเขวงนวลจันทร์ เขตบึงกุ่ม กรุงเทพฯ 10230<br />
          โทร. 02-9461171-5<br />
          Fax 02-106-2114 </Col>
      </Row>
    )
  }
}
