import React, { Component } from 'react'
import { Col, Row } from "reactstrap";
import qrLine from '../../images/qr_line.jpg'
export default class LineContact extends Component {
  render() {
    return (
      <Row>
        <Col md={4} className="d-flex justify-content-center align-items-center p-2"><div><img src={qrLine} className="img-fluid" alt={qrLine} style={{ maxWidth: '150px' }} /></div></Col>
        <Col md={8} className="p-2" style={{display: 'flex', color: '#fff' , justifyContent:'center',flexDirection:'column' , textAlign:'left'}}>
          <div>ชำนาญกรุ๊ป เลขที่ตั้ง 200/94 ซอยนวลจันทร์ 9 เเขวงนวลจันทร์ เขตบึงกุ่ม กรุงเทพฯ 10230</div>
          <div>โทร. 02-9461171-5</div>
          <div>Fax 02-106-2114</div></Col>
      </Row>
    )
  }
}
