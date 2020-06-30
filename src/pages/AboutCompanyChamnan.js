import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import './AboutCompanyLawAndAsset.css'
import chamnangroup from './../images/chamnaninter.jpg'
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
                <img src={chamnangroup} className="img-fluid logo-company" style={{ maxHeight: '200px' }} />
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={{ size: 10, offset: 1 }}>
            <div style={{ textAlign: 'center' }}><h4>{t('chamnan_page.chamnan')}</h4></div>
            <div className="p-4 law-asset-text">
              <p style={{ textIndent: '10%' }}>
              {t('chamnan_page.p1')}</p>
              <div>
              <p style={{ marginBottom: '10px' }}>
              {t('chamnan_page.p1-0')}
              </p>
                <ol>
                  <li>
                  {t('chamnan_page.p1-1')}
                </li>
                  <li>
                  {t('chamnan_page.p1-2')}
                </li>
                  <li>
                  {t('chamnan_page.p1-3')}
                </li>
                  <li>
                  {t('chamnan_page.p1-4')}
                </li>
                  <li>
                  {t('chamnan_page.p1-5')}
                </li>
                <li>
                  {t('chamnan_page.p1-6')}
                </li>
                <li>
                  {t('chamnan_page.p1-7')}
                </li>
                </ol>
              </div>

            </div>
          </Col>
        </Row>
        {/* <Row>
          <Col md={{ size: 10, offset: 1 }}>
            <div className="pt-2 pr-5 pl-5 pb-5 law-asset-text">
              <div>
                <h5 style={{ textIndent: '5%' }}>{t('chamnan_page.service')}</h5>
                <div style={{ marginTop: '15px'}}>1. {t('chamnan_page.s1')}</div>
                <div style={{ textIndent: '10%' }}>{t('chamnan_page.s1-1')}</div>
                <div style={{ textIndent: '10%', marginTop: '15px' }}>{t('chamnan_page.s1-2')}</div>
                <div style={{ textIndent: '10%', marginTop: '15px' }}>{t('chamnan_page.s1-3')}</div>
                <div style={{ textIndent: '10%', marginTop: '15px' }}>{t('chamnan_page.s1-4')}</div>

                <div style={{ marginTop: '15px'}}>2. {t('chamnan_page.s2')}</div>
                <div style={{ textIndent: '10%' }}>{t('chamnan_page.s2-1')}</div>

                <div style={{ marginTop: '15px'}}>3. {t('chamnan_page.s3')}</div>
                <div style={{ textIndent: '10%' }}>{t('chamnan_page.s3-1')}</div>

                <div style={{ marginTop: '15px' }}>4. {t('chamnan_page.s4')}</div>
                <div style={{ textIndent: '10%' }}>{t('chamnan_page.s4-1')}</div>

                <div style={{ marginTop: '15px', marginTop: '15px' }}>5. {t('chamnan_page.s5')}</div>
                <div style={{ textIndent: '10%' }}>{t('chamnan_page.s5-1')}</div>

                <div style={{ marginTop: '15px', marginTop: '15px' }}>6. {t('chamnan_page.s6')}</div>
                <div style={{ textIndent: '10%' }}>{t('chamnan_page.s6-1')}</div>


              </div>
            </div>
          </Col>
        </Row> */}

      </Container>}
      </Translation>
    )
  }
}
