import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
export default class Consultant extends Component {
  render() {
    return (
      <Container className="pt-5 pb-5" style={{ fontSize:'18px'}}>
        <Row>
          <Col md={{ size: 8, offset: 2 }}>
            <div className="p-4">
              <div>
                <ul>
                  <h5>ปรึกษาคดีแพ่ง</h5>
                  <li>
                    รับปรึกษากฎหมายคดีแพ่ง-คดีอาญาฟรี
                </li>
                  <li>
                    รับปรึกษาปัญหากฎหมายครอบครัวฟรี
                </li>
                  <li>
                    รับปรึกษาคดีฟ้องหย่า-จดทะเบียนรับรองบุตรฟรี
                </li>
                  <li>
                    รับเป็นทนายความว่าความทุกคดี
                </li>
                  <li>
                    รับไกล่เกลี่ยประนีประนอมยอมความ
                </li>
                  <li>
                    รับทำคำให้การจำเลยและฟ้องแย้ง
                </li>
                  <li>รับยื่นอุทธรณ์-แก้อุทธรณ์-ขอยื่นอุทธรณ์ลดโทษ</li>
                </ul>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={{ size: 8, offset: 2 }}>
            <div className="p-4">
              <div>
                <ul>
                  <h5>คดีแพ่ง</h5>
                  <li>
                    ฟ้องผิดสัญญา
                </li>
                  <li>
                    ฟ้องขอให้ชำระหนี้
                </li>
                  <li>
                    ฟ้องคดีผู้บริโภคสินเชื่อธนาคาร
                </li>
                  <li>
                    ฟ้องผิดสัญญาจ้าง
                </li>
                  <li>
                    ฟ้องละเมิด
                </li>
                  <li>
                    ฟ้องเรียกค่าเสียหาย
                </li>
                  <li>ฟ้องเรียกค่าสินไหมทดแทน</li>
                  <li>ฟ้องขอเป็นผู้จัดการมรดก</li>
                  <li>ฟ้องขอเพิกถอนผู้จัดการมรดก</li>
                </ul>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={{ size: 8, offset: 2 }}>
            <div className="p-4">
              <div>
                <ul>
                  <h5>ปรึกษาคดีอาญา</h5>
                  <li>
                    คดีฉ้อโกง
                </li>
                  <li>
                    คดียักยอกทรัพย์
                </li>
                  <li>
                    คดีลักทรัพย์
                </li>
                  <li>
                    คดีวิ่งราวทรัพย์
                </li>
                  <li>
                    คดีชิงทรัพย์
                </li>
                  <li>
                    คดีปล้นทรัพย์
                </li>
                  <li>
                    คดีทำร้ายร่างกาย
                  </li>
                  <li>
                    คดีบุกรุก ทำให้เสียทรัพย์
                  </li>
                  <li>
                    คดีพรากผู้เยาว์
                  </li>
                </ul>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={{ size: 8, offset: 2 }}>
            <div className="p-4">
              <div>
                <ul>
                  <h5>คดีเยาวชนและครอบครัว</h5>
                  <li>
                    ฟ้องหย่า
                </li>
                  <li>
                    ฟ้องขอจดทะเบียนรับรองบุตร
                </li>
                  <li>
                    ฟ้องแบ่งสินสมรส
                </li>
                  <li>
                    ฟ้องเรียกค่าเลี้ยงดูบุตร
                </li>
                  <li>
                    ฟ้องขออำนาจปกครองบุตร
                </li>
                  <li>
                    ฟ้องชู้ เรียกค่าทดแทน
                </li>
                </ul>
              </div>
            </div>
          </Col>
        </Row>


      </Container>
    )
  }
}
