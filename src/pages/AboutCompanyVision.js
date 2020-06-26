import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import { Translation } from 'react-i18next';
export default class AboutCompanyVision extends Component {
  render() {
    return (
      <Translation>{t=>
      <Container className="pt-5 pb-5">
        <Row>
          <Col md={{ size:8, offset:2}}>
          <div className="p-4">
            <h4>{t('vision_page.vision')}</h4><br />
            <p style={{ textIndent:'10%'}}>
            {t('vision_page.ar1')}
          </p>
          </div>
          </Col>
        </Row>
        <Row>
          <Col md={{ size:8, offset:2}}>
          <div className="p-4">
            <h4>{t('vision_page.philosophy')}</h4><br />
            <p style={{ textIndent:'10%'}}>
            {t('vision_page.ar2')}
          </p>
          </div>
          </Col>
        </Row>
        <Row>
          <Col md={{ size:8, offset:2}}>
          <div className="p-4">
            {/* <h4>{t('vision_page.goals')}</h4><br /> */}
            <p style={{ textIndent:'10%'}}>
            {t('vision_page.ar3')}
          </p>
          </div>
          </Col>
        </Row>
      </Container>}
      </Translation>
    )
  }
}
