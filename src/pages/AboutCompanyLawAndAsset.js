import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import './AboutCompanyLawAndAsset.css'
import lawandasset from './../images/lawandasset.jpg'
export default class AboutCompanyLawAndAsset extends Component {
  render() {
    return (
      <Container className="pt-5 pb-5">
        <Row>
          <Col md={{ size: 8, offset: 2 }}>
            <div className="p-4" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <div className="p-3 ">
                <img src={lawandasset} className="img-fluid logo-company" style={{ maxHeight: '200px' }} />
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={{ size: 10, offset: 1 }}>
            <div style={{ textAlign: 'center' }}><h4>บริษัท ลอว์ แอนด์ แอสเซท จำกัด</h4></div>
            <div className="p-4 law-asset-text">
              <p style={{ textIndent: '10%' }}>
                บริษัท ลอว์  แอนด์ แอสเซท  จำกัด มีวัตถุประสงค์ดำเนินงานด้านกฎหมาย อาทิเช่น การเร่งรัดหนี้สินทางโทรศัพท์
                ก่อนฟ้องคดี  และรับเป็นที่ปรึกษากฎหมายด้านการเงิน  ธุรกิจพาณิชย์การปรับโครงสร้างหนี้  และการฟืนฟูกิจการรวมทั้งวางแผนและโครงสร้างทางกฎหมายในองค์กร
                บริษัท ห้างหุ้นส่วนหรือบุคคลทั่วไป  รับดำเนินการฟ้องคดี  ว่าความแก้ต่างให้แก่สถาบันการเงิน  บริษัท  ห้างหุ้นส่วนหรือบุคคลทั่วไป  และรับบริการเป็นตัวแทนนายหน้า
                 ชื้อขาย  จัดการ   อสังหาริมทรัพย์  และจัดการสินทรัพย์  รวมทั้งจัดหาแหล่งเงินทุนสนับสนุนธุรกิจของลูกค้า  เป็นต้น  โดยบริษัท  ลอว์  แอนด์ แอสเซท
                  จำกัด ได้แยกส่วนงานเป็นดังนี้
              </p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={{ size: 10, offset: 1 }}>
            <div className="p-2 law-asset-text">
              <div>
                <ol>
                  <h5>คณะที่ปรึกษา จำนวน 7 คน</h5>
                  <li>
                    ที่ปรึกษาด้านธุรกิจพาณิชย์ การตลาด การเงิน บัญชี และ การปรับปรุงโครงสร้างหนี้ จำนวน 1 คน
                </li>
                  <li>
                    ที่ปรึกษาด้านบัญชีจำนวน 1 คน
                </li>
                  <li>
                    ที่ปรึกษาด้านกฎหมาย และ เร่งรัดหนี้สิน จำนวน 3 คน
                </li>
                  <li>
                    ที่ปรึกษาด้านการจัดการทรัพย์สิน จำนวน 1 คน
                </li>
                  <li>
                    ที่ปรึกษาด้านระบบคอมพิวเตอร์  และ ฐานข้อมูล จำนวน 1 คน
                </li>
                </ol>
              </div>

              <div>
                <ol>
                  <h5>ฝ่ายกฎหมาย จำนวน 12 คน</h5>
                  <li>
                    เจ้าหน้าที่ฝ่ายบังคับคดี จำนวน 7 คน
                </li>
                  <li>
                    เจ้าหน้าที่บัญชีและการเงิน 1 คน
                </li>
                  <li>
                    เจ้าหน้าที่ธุรการ จำนวน 6 คน
                </li>
                  <li>
                    ผู้จัดการส่วนงานคดี จำนวน 2 คน
                </li>
                  <li>
                    พนักงานรับ - ส่งเอกสาร จำนวน 1 คน
                </li>
                </ol>
              </div>
            </div>
          </Col>
        </Row>

      </Container>
    )
  }
}
