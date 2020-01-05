import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import chamnangroup from '../images/chamnangroup.jpg'
import lawandasset from '../images/lawandasset.jpg'
import chamnaninter from '../images/chamnaninter.jpg'
import './AboutCompanyStructure.css'
export default class AboutCompanyStructure extends Component {
  render() {
    return (
      <Container className="pt-5 pb-5">
        <Row>
          <Col md={{ size: 8, offset: 2 }}>
            <div style={{ textAlign: 'center' }}><h1>โครงสร้างองค์กร</h1></div>
          </Col>
        </Row>
        <Row>
          <Col md={{ size: 8, offset: 2 }}>
            <div className="p-4" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <div className="p-3 ">
                <img src={chamnangroup} className="img-fluid logo-company" style={{ maxHeight: '200px' }} />
              </div>
              <div className="p-3 text-company">
                บริษัท  ชำนาญบิสซิเนส กรุ๊ป (ไทยแลนด์) จำกัด
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={{ size: 8, offset: 2 }}>
            <div className="p-4" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <div className="p-3 ">
                <img src={lawandasset} className="img-fluid logo-company" style={{ maxHeight: '200px' }} />
              </div>
              <div className="p-3 text-company">
                <a href="/aboutCompany/lawAndAsset">บริษัท  ลอว์  แอนด์  แอสเซท  จำกัด</a>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={{ size: 8, offset: 2 }}>
            <div className="p-4" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <div className="p-3 ">
                <img src={chamnaninter} className="img-fluid logo-company" style={{ maxHeight: '200px' }} />
              </div>
              <div className="p-3 text-company">
                บริษัท ชำนาญ  อินเตอร์เนชั่นแนล ลอว์  จำกัด
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    )
  }
}
