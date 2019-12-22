import React, { Component } from 'react'
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  InputNumber,
  Modal,
  Upload,
  message
} from 'antd';
import { Container } from 'reactstrap'
import { Link } from 'react-router-dom'
import axios, { post } from 'axios'
import url from '../../src/url_config'
import { compose, withProps, lifecycle } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, SearchBox } from "react-google-maps"

const { TextArea } = Input;
const AddMarker = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyD7znYiqytpFwvWR0wIfDHWBGH7BZQ1PWU&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  lifecycle({
    componentWillMount() {
      const refs = {}

      this.setState({
        position: null,
        onMarkerMounted: ref => {
          refs.marker = ref;
        },

        onPositionChanged: () => {
          const position = refs.marker.getPosition();
          console.log("Position : ", position.toString());
        }
      })
    },
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap defaultZoom={15} defaultCenter={{ lat: props.lat, lng: props.lng }}>
    <Marker position={{ lat: props.lat, lng: props.lng }} draggable={true} ref={props.onMarkerMounted} onPositionChanged={props.onPositionChanged} />
  </GoogleMap>
)

class CreateSaleLands extends Component {
  state = {
    confirmDirty: false,
    lat: 13.7278956,
    lng: 100.52412349999997,
    data: [],
    isMarkerShown: true,
    previewVisible: false,
    previewImage: "",
    fileList: [],
    data: [],
    file: null,
    idLand: null
  };

  handleSubmit = (e) => {
    e.preventDefault();
    try {

      this.props.form.validateFieldsAndScroll(async (err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          values.lat = this.state.lat
          values.lng = this.state.lng
          values.user_type = 'register'
          await axios.post(`${url}/lands/create`, values).then(res => {
            const { data } = res
            this.setState({ idLand: data.id })
          })
           this.upload(this.state.fileList).then(res => {
            const data = {
              id: this.state.idLand,
              url: res.data.file.filename
            }
            this.savePath(data)
          })
          
        }
      });

    } catch (error) {
      console.log("Catch : ", error);

      message.error('Please choose you Banner');
    }
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  componentDidMount() {
    this.delayedShowMarker()
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true })
    }, 3000)
  }

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false })
    this.delayedShowMarker()
  }

  upload = () => {
    const urlUpload = `${url}/lands/uploadImage`
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
    await axios.put(`${url}/lands/savePathImage`, data).then(res => {
      console.log("saved : ", res)
    })
    this.props.history.push(`/`)
  }

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = file => {
    this.setState({
      previewImage: file.thumbUrl,
      previewVisible: true
    });
  };

  handleUpload = ({ fileList }) => {

    console.log('fileList', fileList);
    this.setState({ fileList });

  }

  render() {

    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
        md: { span: 6 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
        md: { span: 14 }
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
        md: {
          span: 18,
          offset: 6
        }
      },
    };
    const { previewVisible, previewImage, fileList } = this.state;
    const urlImage = "http://localhost:3001/"
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return (
      <Container>
        <Row className="p-5">
          <Col>
            <h1>สร้างการประกาศขายที่ดิน</h1>
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
              <Form.Item
                label={
                  <span>
                    หัวข้อ&nbsp;
              </span>
                }
              >
                {getFieldDecorator('title', {
                  rules: [{ required: true, message: 'Please input your title!', whitespace: true }],
                })(<Input placeholder="หัวข้อเกี่ยวกับการขาย" />)}
              </Form.Item>

              <Form.Item
                label={
                  <span>
                    รายละเอียด&nbsp;
              </span>
                }
              >
                {getFieldDecorator('detail', {
                  rules: [{ required: true, message: 'Please input your detail!', whitespace: true }],
                })(<TextArea placeholder="รายละเอียดเกี่ยวกับที่ดิน" />)}
              </Form.Item>

              <Form.Item
                label={
                  <span>
                    ราคา &nbsp;
              </span>
                }
              >
                {getFieldDecorator('price', {
                  rules: [{ required: true, message: 'Please input your price!!' }],
                })(<InputNumber placeholder="ราคา" />)}
              </Form.Item>

              <Form.Item
                label={
                  <span>
                    กรุณาเลือกภาพหน้าปกของคุณ&nbsp;
              </span>
                }
              >
                <div className="">
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
                  <Modal
                    visible={previewVisible}
                    footer={null}
                    onCancel={this.handleCancel}
                  >
                    <img alt="example" style={{ width: "100%" }} src={previewImage} />
                  </Modal>
                </div>
              </Form.Item>


              <Form.Item
                label={
                  <span>
                    กรุณาเลือกจุดที่ต้องการ&nbsp;
              </span>
                }
              >
                <div className="">
                  <AddMarker
                    isMarkerShown={this.state.isMarkerShown}
                    onMarkerClick={this.handleMarkerClick}
                    lat={this.state.lat}
                    lng={this.state.lng}
                  />
                </div>
              </Form.Item>



              <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                  Create
                </Button>
              </Form.Item>

            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}
export default Form.create()(CreateSaleLands);