import React, { Component } from 'react';
import { Upload, Icon, Modal, Row, Col, message, Button, Carousel } from 'antd';
import AliceCarousel from 'react-alice-carousel';
import './ManageBanners.css'
import axios, { post } from 'axios'
import url from '../../url_config'


const pic2 = 'https://i1.wp.com/annenglish.co.uk/wp-content/uploads/2017/11/NEW-Ideas-Mapping-Slider-1200-x-600px-1-2.png'
const pic3 = 'https://i1.wp.com/annenglish.co.uk/wp-content/uploads/2017/11/NEW-Ideas-Mapping-Slider-1200-x-600px-1-2.png'
export default class ManageBanners extends Component {

  state = {
    previewVisible: false,
    previewImage: "",
    fileList: [],
    data: [],
    file: null
  };

  responsive = {
    0: { items: 1 },
    600: { items: 2 },
    960: { items: 3 }
  }

  stagePadding = {
    paddingLeft: 0,
    paddingRight: 0,
  }

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = file => {
    this.setState({
      previewImage: file.thumbUrl,
      previewVisible: true
    });
  };

  componentDidMount = () => {
    this.getImage()
  }

  getImage = async () => {
    await axios.get(`${url}/banners`).then(res => {
      const { data } = res
      this.setState({ data });
      console.log("DataImage : ", data);
    })

  }

  handleUpload = ({ fileList }) => {

    console.log('fileList', fileList);
    this.setState({ fileList });

  }



  handleSubmit = event => {

    try {
      event.preventDefault();

      this.upload(this.state.fileList).then(res => {
        const data = {
          url: res.data.file.filename
        }
        this.savePath(data)
      })

    } catch (error) {
      console.log("Catch : ", error);

      message.error('Please choose you Banner');
    }

  };

  upload = () => {
    const urlUpload = `${url}/banners/uploadImage`
    const formData = new FormData()
    formData.append("imageData", this.state.fileList[0].originFileObj);
    // formData.append('imageData', file)
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    return post(urlUpload, formData, config)
  }

  savePath = async (data) => {
    await axios.put(`${url}/banners/savePathImage`, data).then(res => {
      console.log("saved : ", res)
    }).then(await this.getImage())
  }

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const urlImage = "http://localhost:3001/"
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="container">

        <Row>
          <Col xs={{ span: 22, offset: 1 }} lg={{ span: 20, offset: 2 }}>
            <Carousel autoplay>
              {this.state.data.map(e => {
                return (<div key={e.id} className="d-flex align-items-center justify-content-center item"><img src={`${urlImage}${e.url}`} alt={e.url} className="img-fluid" /></div>)
              })}
            </Carousel>
          </Col>
        </Row>

        <Row className="mt-4 d-flex justify-content-center">
          <Col>
            <div>
              <Upload
                listType="picture-card"
                fileList={fileList}
                onPreview={this.handlePreview}
                onChange={this.handleUpload}
                beforeUpload={() => false} // return false so that antd doesn't upload the picture right away
              >
                {fileList.length >= 1 ? null : uploadButton}
              </Upload>
            </div>
          
            <div>
              <Button onClick={this.handleSubmit}>Submit</Button>
            </div>
          </Col>
          <Modal
            visible={previewVisible}
            footer={null}
            onCancel={this.handleCancel}
          >
            <img alt="example" style={{ width: "100%" }} src={previewImage} />
          </Modal>
        </Row>
      </div>
    );
  }
}