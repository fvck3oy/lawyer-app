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
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js'
import { thisExpression } from '@babel/types';
import line from '../images/line.jpg'
import { Link } from 'react-router-dom'
const styles = {
  editor: {
    border: '1px solid gray',
    minHeight: '6em'
  }
};
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
    images: [],
    dataDetail: ''
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
      // console.log("res data : ", res.data)

      if (Object.entries(res.data).length === 0 && res.data.constructor === Object) {
        // console.log("True");
        this.props.history.push(`/allSaleLand`)
      } else {
        // console.log("False");


        await this.setState({ data });
        // console.log("Data : ", this.state.data);
        await this.setState({ username: this.state.data.dataUser })
        // console.log("Data : ", this.state.username);
        await this.setState({ lat: data.lat })
        await this.setState({ lng: data.lng })
        await this.setState({ check: true })


        // console.log("data : ", JSON.parse(this.state.data.detail));
        // const contentState = convertFromRaw(JSON.parse(this.state.data.detail));
        // const editorState = EditorState.createWithContent(contentState);
        // console.log("editorState : ", contentState);
        // this.setState({dataDetail:contentState})


        await this.setState({ price: this.formatNumber(data.price) })
        let images = []
        // const urlImage = "http://127.0.0.1:3013/"
        const urlImage = "https://www.chamnangroup.com/"
        // let newew = this.state.data.map(e=>{
        //   return {   
        //       original:urlImage+e.image,
        //       thumbnail:urlImage+e.image}
        data.dataImage.map(e => {

          let data = {
            original: urlImage + e.image,
            thumbnail: urlImage + e.image
          }
          images.push(data)
        })


        // console.log("new : ", images);
        this.setState({ images: images })
      }

    })
  }


  formatNumber = (num) => {
    // console.log("num : ", num);

    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  render() {
    const { data, username } = this.state

    // const contentState = convertFromRaw(JSON.parse(this.state.data.detail));
    // const editorState = EditorState.createWithContent(contentState);
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
            <div className="mt-2 mb-3"> <h5>{data.title}</h5></div>
              <div className="mt-2 mb-3"><Icon type="pushpin" style={{ marginRight: '10px' }} /> เลขที่ประกาศ {this.state.data.id} </div>
              <div className="mt-2 mb-3"><Icon type="edit" style={{ marginRight: '10px' }} /> อัพเดทล่าสุดวันที่ <Moment format="DD/MM/YYYY">{this.state.data.update}</Moment></div>
              <div className="mt-2 mb-3"><Icon type="eye" style={{ marginRight: '10px' }} /> เข้าชมเเล้ว {this.state.data.view} </div>
              <div className="mt-2 mb-3"><Icon type="user" style={{ marginRight: '10px' }} /> ผู้ประกาศขาย {username.firstname} {username.lastname} </div>
              <div className="mt-2 mb-3"><Icon type="phone" style={{ marginRight: '10px' }} /> เบอร์โทร 0{username.tel} </div>
              <div className="mt-2 mb-3"><Icon type="star" style={{ marginRight: '10px' }} /> ราคา  {this.state.price}  บาท</div>
              <div className="mt-2 mb-3"><Icon type="table" style={{ marginRight: '10px' }} /> พื้นที่  {this.state.data.area} </div>
              <div className="mt-2 mb-3 d-flex"><a  target="_blank" href="https://line.me/ti/p/QjJDbt9mIG"><img src={line} className="img-fluid"/></a></div>

            </div>
            </Col>
            <Col md={8}><div className="mt-4 mb-4 p-4"><ImageGallery items={this.state.images} showPlayButton={false} /></div></Col>
          </Row>
          <Row><Col><div className="mt-4 mb-4"> <Icon type="home" /> รายละเอียด</div></Col></Row>

          <Row><Col>

            <div className="mt-2 mb-4 ml-5" >

              <div dangerouslySetInnerHTML={{ __html: data.detail }} />
            </div>

            {/* <div style={styles.editor} onClick={this.focusEditor}> */}
            {/* <Editor
                editorState={this.state.dataDetail} readOnly={true}
              /> */}
            {/* </div> */}

          </Col></Row>

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
