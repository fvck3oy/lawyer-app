import React, { Component } from 'react';
import { Upload, Icon, Modal, Row, Col, message, Button, Carousel, Card ,notification} from 'antd';
import AliceCarousel from 'react-alice-carousel';
import './ManageBanners.css'
import axios, { post } from 'axios'
import url from '../../url_config'

const gridStyle = {
  width: '25%',

};

const pic2 = 'https://i1.wp.com/annenglish.co.uk/wp-content/uploads/2017/11/NEW-Ideas-Mapping-Slider-1200-x-600px-1-2.png'
const pic3 = 'https://i1.wp.com/annenglish.co.uk/wp-content/uploads/2017/11/NEW-Ideas-Mapping-Slider-1200-x-600px-1-2.png'
export default class ManageBanners extends Component {

  state = {
    previewVisible: false,
    previewImage: "",
    fileList: [],
    data: [],
    file: null,
    visible: false
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


  getImage = e => {
    // e.preventDefault()
    axios.get(`${url}/banners`).then(res => {
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
      this.setState({fileList:[]})
    }).then(
      await this.getImage
    )

  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk =async e => {
    console.log(e);
    await this.handleSubmit(e)
    await this.setState({
        visible: false,
      })
    
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  remove = async (id) => {
    await axios.delete(`${url}/banners/${id}`).then(res => {
      console.log("delete : ", res)
      if (res.data) {
        console.log('ok');
        this.openNotificationWithIcon('success')
      } else {
        console.log('else');
        this.openNotificationWithIcon('error')
      }
    }).then(
      await this.getImage
    )
  }
  openNotificationWithIcon = (type) => {
    console.log(type);

   if (type == 'success'){
     notification[type]({
       message: `Removed !`,
       description:
         `Remove Banner`,
     });
   }else{
    notification[type]({
      message: 'Error',
      description:
        'Error can not Update.',
    });
   }

};

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    // const urlImage = "http://127.0.0.1:3001/"
    const urlImage = "http://167.71.193.2:3001/"
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="container">

        <div className="p-3">
          <h2>ตัวอย่าง Banners</h2>
          <Row>
            <Col xs={{ span: 22, offset: 1 }} lg={{ span: 20, offset: 2 }}>
              <Carousel autoplay>
                {this.state.data.map(e => {
                  return (<div key={e.id} className="d-flex align-items-center justify-content-center item"><img src={`${urlImage}${e.url}`} alt={e.url} className="img-fluid" /></div>)
                })}
              </Carousel>
            </Col>
          </Row>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row-reverse', margin: '10px' }}>
          <Button type="primary" onClick={this.showModal}>
            เพิ่มรูปภาพ
        </Button>
        </div>

        <div>
          <Modal
            title="เพิ่มรูปภาพ"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <Row className="mt-4 d-flex justify-content-center">
              <Col>
                <div>
                  <Upload
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleUpload}
                    beforeUpload={() => false}
                  >
                    {fileList.length >= 1 ? null : uploadButton}
                  </Upload>
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
          </Modal>
        </div>

        <div className="pb-5">
          <Card title="Banners List">
            {this.state.data.map(e => {
              return (<div key={e.id} className="">
                <Card.Grid style={gridStyle} style={{ height:'150px'}}>
                  <img src={`${urlImage}${e.url}`} alt={e.url} className="img-fluid" />
                  <div onClick={() => this.remove(e.id)} style={{ color: 'red', cursor: 'pointer' }}>Remove</div>
                </Card.Grid>
              </div>)
            })}
          </Card>
        </div>
      </div>
    );
  }
}