import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap';
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import Map from '../components/ShowMap/ShowMap'
import { Icon } from 'antd';
// import PictureSaleLands from '../components/PictureSaleLands/PictureSaleLands';
import ImageGallery from 'react-image-gallery';
import axios from 'axios'
import url from '../url_config'
import './SaleLand.css'
import Moment from 'react-moment'
const images = [
  {
    original: 'https://picsum.photos/id/1018/1000/600/',
    thumbnail: 'https://picsum.photos/id/1018/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1015/1000/600/',
    thumbnail: 'https://picsum.photos/id/1015/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1019/1000/600/',
    thumbnail: 'https://picsum.photos/id/1019/250/150/',
  },



];

export default class SaleLand extends Component {
  state = {
    isMarkerShown: false,
    data: {},
    lat: 0,
    lng: 0,
    check: false,
    username: '',
    price: 0,
    images: []
  }
  // handleMarkerClick = () => {
  //   this.setState({ isMarkerShown: false })
  //   this.delayedShowMarker()
  // }

  componentDidMount = async () => {
    await this.saleLand()
  }

 

  saleLand = async () => {

    await axios.get(`${url}/lands/${this.props.match.params.id}`).then(async res => {
      const { data } = res
      await this.setState({ data });
      console.log("Data : ", this.state.data);
      await this.setState({ username: this.state.data.dataUser })
      console.log("Data : ", this.state.username);
      await this.setState({ lat: data.lat })
      await this.setState({ lng: data.lng })
      await this.setState({ check: true })

      await this.setState({ price: this.formatNumber(data.price) })
      let images = []
      // const urlImage = "http://127.0.0.1:3001/"
      const urlImage = "http://167.71.193.2:3001/"
      // let newew = this.state.data.map(e=>{
      //   return {   
      //       original:urlImage+e.image,
      //       thumbnail:urlImage+e.image}
      let each = {
        original: urlImage + data.image,
        thumbnail: urlImage + data.image
      }
      images.push(each)
      console.log("new : ", images);
      this.setState({ images: images })

      // await this.setState({images: data.map(e=>{
      //   return {   
      //       original:urlImage+e.image,
      //       thumbnail:urlImage+e.image}
      // })})

    })
  }

  formatNumber = (num) => {
    console.log("num : ", num);

    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  render() {
    const { data, username } = this.state
    return (
      <div>
        <Container style={{ marginBottom: '50px', fontSize: '18px', padding: '20px' }}>
          <Row className="m-3">
            <Col>
              <div className="d-flex">
                {/* <div>Filter</div>
                <div><input /></div> */}
              </div>

            </Col>
          </Row>

          {/* <Row>
            <Col>
              <div className="mt-2 mb-2">เลขที่ประกาศ {data.id}</div>
            </Col>
          </Row>
          <Row className="ml-2"><Col><div className="mt-3 mb-2">อัพเดทล่าสุดวันที่ <Moment format="DD/MM/YYYY">{this.state.data.update}</Moment></div></Col></Row>
          <Row className="ml-2"><Col><div className="d-flex"><div className="mr-2"></div></div></Col></Row> */}

          <Row>
            <Col md={4}><div className="mt-3 mb-2 p-4">

              <div className="mt-2 mb-3"><Icon type="pushpin" style={{ marginRight: '10px' }} /> เลขที่ประกาศ {this.state.data.id} </div>
              <div className="mt-2 mb-3"><Icon type="edit" style={{ marginRight: '10px' }} /> อัพเดทล่าสุดวันที่ <Moment format="DD/MM/YYYY">{this.state.data.update}</Moment></div>
              <div className="mt-2 mb-3"><Icon type="eye" style={{ marginRight: '10px' }} /> เข้าชมเเล้ว {this.state.data.view} </div>
              <div className="mt-2 mb-3"><Icon type="user" style={{ marginRight: '10px' }} /> ผู้ประกาศขาย {username.firstname} {username.lastname} </div>
              <div className="mt-2 mb-3"><Icon type="phone" style={{ marginRight: '10px' }} /> เบอร์โทร 0{username.tel} </div>
              <div className="mt-2 mb-3"><Icon type="star" style={{ marginRight: '10px' }} /> ราคา  {this.state.price}  บาท</div>
              <div className="mt-2 mb-3"><Icon type="table" style={{ marginRight: '10px' }} /> พื้นที่  {this.state.data.area} </div>

            </div>
            </Col>
            <Col md={8}><div className="mt-4 mb-4 p-4"><ImageGallery items={this.state.images} showPlayButton={false} /></div></Col>
          </Row>
          <Row><Col><div className="mt-4 mb-4"> <Icon type="home" /> {data.title}</div></Col></Row>

          <Row><Col><div className="mt-2 mb-4 ml-5">{data.detail}</div></Col></Row>

          <Row><Col><div className="mt-4 mb-4">

            <div className="mb-3"><Icon type="environment" /> แผนที่</div>
            {this.state.check == true && <Map
              isMarkerShown={this.state.isMarkerShown}
              lat={parseFloat(this.state.data.lat)}
              lng={parseFloat(this.state.data.lng)}
            // onMarkerClick={this.handleMarkerClick}
            />}
          </div></Col></Row>
          {/* <Row>
            <Col><div className="mt-2 mb-2 ml-3">
              ราคาพิเศษเฉพาะงานประมูลขายบ้านมือสอง (รวมที่ดินเปล่า) ธอส. ครั้งที่ 4/2562 ในวันเสาร์ที่ 14 ธันวาคม 2562 โดยเปิดให้ลงชื่อเข้าร่วมประมูลตั้งแต่เวลา 8.00 น.
                         เป็นต้นไป และเริ่มทำการประมูลตั้งแต่เวลา 10.00 - 16.00 น. ณ ห้องประชุมพิมานมาศ อาคารจอดรถ ชั้น 11 ธนาคารอาคารสงเคราะห์ สำนักงานใหญ่(ทรัพย์ลำดับที่ 24)</div>
            </Col>
          </Row> */}
        </Container>
      </div>
    )
  }
}
