import React, { Component } from 'react'
import axios from 'axios'
import url from '../url_config'
import { Container, Row, Col } from 'reactstrap';
import ImageGallery from 'react-image-gallery';
import Moment from 'react-moment'
export default class Article extends Component {
  state = {
    data: {},
    images: []
  }
  // handleMarkerClick = () => {
  //   this.setState({ isMarkerShown: false })
  //   this.delayedShowMarker()
  // }

  componentDidMount = () => {
    this.getData()
  }

  getData = async () => {

    await axios.get(`${url}/blogs/${this.props.match.params.id}`).then(res => {
      const { data } = res
      if (Object.entries(res.data).length === 0 && res.data.constructor === Object) {
        console.log("True");
        this.props.history.push(`/allArticle`)
      } else {
        this.setState({ data });
        console.log("Data : ", data);
        let images = []
        // const urlImage = "http://127.0.0.1:3013/"
        const urlImage = "https://www.chamnangroup.com/"
        data.dataImage.map(e => {

          let data = {
            original: urlImage + e.image,
            thumbnail: urlImage + e.image
          }
          images.push(data)
        })


        console.log("new : ", images);
        this.setState({ images: images })

      }
    })
  }
  render() {
    // const urlImage = "http://127.0.0.1:3013/"
    const urlImage = "https://www.chamnangroup.com/"
    return (
      <Container className="pt-5 pb-5">
        <Row>
          <Col md={{ size: 8, offset: 2 }}>
            <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
              <div>
                <h6>ประกาศ ณ วันที่ <Moment format="DD/MM/YYYY">{this.state.data.created}</Moment></h6>
              </div>
            </div>
          </Col>
        </Row>

        <Row>
          <Col md={{ size: 8, offset: 2 }}>
            <div style={{ display: 'flex', flexDirection: 'row-reverse', paddingTop: '10px' }}>
              <div>
                <h6>อ่านแล้ว {this.state.data.view}</h6>
              </div>
            </div>
          </Col>
        </Row>

        <Row>
          <Col md={{ size: 8, offset: 2 }}>
            <div className="p-2 m-2" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              {/* <img src={`${urlImage}${this.state.data.image}`} className="img-fluid logo-company" style={{ maxHeight: '600px' }} /> */}
              <div className="mt-4 mb-4 p-4"><ImageGallery items={this.state.images} showPlayButton={false} /></div>
            </div>
          </Col>
        </Row>

        <Row>
          <Col md={{ size: 8, offset: 2 }}>
            <div style={{ textAlign: 'center', }}><h4>{this.state.data.title}</h4></div>
          </Col>
        </Row>

        <Row>
          <Col md={{ size: 8, offset: 2 }}>
            <div className="p-4" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <div className="p-3 text-company" style={{}}>
                {/* <h5>{this.state.data.detail}</h5> */}
                <div dangerouslySetInnerHTML={{ __html: this.state.data.detail }} />
              </div>
            </div>
          </Col>
        </Row>

      </Container>
    )
  }
}
