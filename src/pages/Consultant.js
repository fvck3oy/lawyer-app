import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { Translation } from 'react-i18next';
export default class Consultant extends Component {
  render() {
    return (
      <Translation>{t =>
        <Container className="pt-5 pb-5" style={{ fontSize: '18px' }}>
          <Row>
            <Col md={{ size: 8, offset: 2 }}>
              <div className="p-4">
                <div>
                  <h5>{t('service_page.t1')}</h5>
                  <div style={{ textIndent: '10%', marginTop: '20px' }}>{t('service_page.p1')}</div>
                  <ul style={{ marginTop: '20px' }}>
                    <li>
                      {t('service_page.p1-1')}
                    </li>
                    <li>
                      {t('service_page.p1-2')}
                    </li>
                    <li>
                      {t('service_page.p1-3')}
                    </li>
                    <li>
                      {t('service_page.p1-4')}
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
                  <h5>{t('service_page.t2')}</h5>
                  <div style={{ textIndent: '10%', marginTop: '20px' }}> {t('service_page.p2')}</div>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={{ size: 8, offset: 2 }}>
              <div className="p-4">
                <div>
                  <h5>{t('service_page.t3')}</h5>
                  <div style={{ textIndent: '10%', marginTop: '20px' }}>{t('service_page.p3')}</div>
                  <ul style={{ marginTop: '20px' }}>
                    <li>
                      {t('service_page.p3-1')}
                    </li>
                    <li>
                      {t('service_page.p3-2')}
                    </li>
                    <li>
                      {t('service_page.p3-3')}
                    </li>
                    <li>
                      {t('service_page.p3-4')}
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
                  <h5>{t('service_page.t4')}</h5>
                  <ul style={{ marginTop: '20px' }}>
                    <li>
                      {t('service_page.p4-1')}
                    </li>
                    <li>
                      {t('service_page.p4-2')}
                    </li>
                    <li>
                      {t('service_page.p4-3')}
                    </li>
                    <li>
                      {t('service_page.p4-4')}
                    </li>
                    <li>
                      {t('service_page.p4-5')}
                    </li>
                    <li>
                      {t('service_page.p4-6')}
                    </li>
                    <li>
                      {t('service_page.p4-7')}
                    </li>
                    <li>
                      {t('service_page.p4-8')}
                    </li>
                    <li>
                      {t('service_page.p4-9')}
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
                  <h5>{t('service_page.t5')}</h5>
                  <ul style={{ marginTop: '20px' }}>
                    <li>
                      {t('service_page.p5-1')}
                    </li>

                  </ul>
                </div>
              </div>
            </Col>
          </Row>
        </Container>}
      </Translation>
    )
  }
}
