import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import chamnangroup from '../images/chamnanBusiness.jpg'
import lawandasset from '../images/lawandasset.jpg'
import chamnaninter from '../images/chamnaninter.jpg'
import './AboutCompanyStructure.css'
import { Translation } from 'react-i18next';
export default class AboutCompanyStructure extends Component {
  render() {
    return (
      <Translation>{t=>
      <Container className="pt-5 pb-5" style={{  textAlign:'justify' }}>
        <Row>
          <Col md={{ size: 8, offset: 2 }}>
            <div className="pb-4" style={{ textAlign: 'center' }}><h1>{t('structure_page.structure')}</h1></div>
          </Col>
        </Row>
        <Row>
          <Col md={{ size: 6 }}>
            <div className="p-4" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <a href="/aboutCompany/chamnan">{t('structure_page.chamnan')}</a>
              <div className="p-3 ">
                <img src={chamnaninter} className="img-fluid logo-company" style={{ maxHeight: '200px' }} />
              </div>
              <div className="p-3 text-company">
              </div>
            </div>
          </Col>
          <Col md={{ size: 6 }}  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'  }}>
          <div >
              <div>
                <h5>{t('structure_page.d1')}</h5>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={{ size: 6}}>
            <div className="p-4" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <a href="/aboutCompany/chamnanBusiness">{t('structure_page.chamnanBusiness')}</a>
              <div className="p-3 ">
                <img src={chamnangroup} className="img-fluid logo-company" style={{ maxHeight: '200px' }} />
              </div>
              {/* <div className="p-3 text-company">
                บริษัท ชำนาญบิสซิเนส กรุ๊ป (ไทยแลนด์) จำกัด
              </div> */}
            </div>
          </Col>
          <Col md={{ size: 6 }}  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'  }}>
          <div  style={{ display: 'flex',  }}>
              <div>
                <h5>{t('structure_page.d2')}</h5>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={{ size: 6 }}>
            <div className="p-4" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <a href="/aboutCompany/lawAndAsset">{t('structure_page.lawAndAsset')}</a>
              <div className="p-3 ">
                <img src={lawandasset} className="img-fluid logo-company" style={{ maxHeight: '200px' }} />
              </div>
              <div className="p-3 text-company">
              </div>
            </div>
          </Col>
          <Col md={{ size: 6 }}  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'  }}>
          <div  style={{ display: 'flex',  }}>
              <div>
                <h5>{t('structure_page.d3')}</h5>
              </div>
            </div>
          </Col>
          
        </Row>
        
      </Container>}
      </Translation>
    )
  }
}
