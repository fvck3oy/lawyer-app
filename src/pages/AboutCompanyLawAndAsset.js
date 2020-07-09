import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import './AboutCompanyLawAndAsset.css'
import lawandasset from './../images/lawandasset.jpg'
import { Translation } from 'react-i18next';
export default class AboutCompanyLawAndAsset extends Component {
  render() {
    return (
      <Translation>{t=>
      <Container className="pt-5 pb-5" style={{  textAlign:'justify'}}>
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
            <div style={{ textAlign: 'center' }}><h4>{t('law_page.lawAndAsset')}</h4></div>
            <div className="p-4 law-asset-text">
            <h4>{t('law_page.mission')}</h4>
              <p style={{ textIndent: '10%' }}>
              {t('law_page.d1')}
              </p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={{ size: 10, offset: 1 }}>

            <div className="p-4 law-asset-text">
            <h4>{t('law_page.equipment')}</h4>
              <p style={{ textIndent: '10%' }}>
              {t('law_page.d2')}
              </p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={{ size: 10, offset: 1 }}>

            <div className="p-4 law-asset-text">
            <h4>{t('law_page.vision')}</h4>
              <p style={{ textIndent: '10%' }}>
              {t('law_page.d3')}
              </p>
            </div>
          </Col>
        </Row>
      </Container>}
      </Translation>
    )
  }
}
