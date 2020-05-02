import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import './AboutCompanyLawAndAsset.css'
import chamnanBusiness from './../images/chamnanBusiness.jpg'
import { Translation } from 'react-i18next';

export default class AboutCompanyLawAndAsset extends Component {
  render() {
    return (
      <Translation>{t=>
      <Container className="pt-5 pb-5">
        <Row>
          <Col md={{ size: 8, offset: 2 }}>
            <div className="p-4" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <div className="p-3 ">
                <img src={chamnanBusiness} className="img-fluid logo-company" style={{ maxHeight: '200px' }} />
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={{ size: 10, offset: 1 }}>
            <div style={{ textAlign: 'center' }}><h4>{t('chamnan_business_page.chamnanBusiness')}</h4></div>
            <div className="p-4 law-asset-text">
              <p style={{ textIndent: '10%' }}>
              {t('chamnan_business_page.p1')}
              </p>
              <p style={{ textIndent: '10%' }}>
              {t('chamnan_business_page.p2')}</p>
            </div>
          </Col>
        </Row>
      </Container>}
      </Translation>
    )
  }
}
