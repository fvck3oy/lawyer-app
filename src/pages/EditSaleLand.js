import React, { Component } from 'react'
import axios, { post } from 'axios'
import url from '../url_config'
import auth from "../service/index"
import Moment from 'react-moment'
import EditMap from '../components/ShowMap/EditMap'
import { compose, withProps, lifecycle } from "recompose"
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

        onPositionChanged: async () => {
          const position = refs.marker.getPosition();
          console.log("Position : ", position.toString());
          const latlong = position.toString().replace('(', '').split(',');
          console.log("LatLng : ", latlong);

          const latitude = parseFloat(latlong[0]);
          const longitude = parseFloat(latlong[1]);
          await this.setState({ lat: latitude })
          await this.setState({ lng: longitude })
          this.props.setLatLng(latitude, longitude)

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

class EditSaleLand extends Component {
  state = {
    confirmDirty: false,
    lat: 13.7278956,
    lng: 100.52412349999997,
    data: [],
    isMarkerShown: true,
    previewVisible: false,
    previewImage: "",
    fileList: [],
    file: null,
    idLand: null,
    username: '',
    check: false
  };
  setLatLng = async (lat, lng) => {
    console.log('set Lat : ', lat);
    console.log('set Lng : ', lng);
    await this.setState({ lat: parseFloat(lat) })
    await this.setState({ lng: parseFloat(lng) })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    try {
      this.props.form.validateFieldsAndScroll(async (err, values) => {
        let user = auth.getToken()
        let userDecoded = auth.decodeToken(user)
        let userId = userDecoded.id

        if (!err) {
          console.log('value Lat : ', this.state.lat);
          console.log('value Lng : ', this.state.lng);
          values.id = this.props.match.params.id
          values.user = userId
          values.lat = this.state.lat
          values.lng = this.state.lng
          // values.user_type = 'register'

          console.log('Received values of form: ', values);
          await axios.put(`${url}/lands/edit`, values).then(res => {
            const { data } = res
            console.log("Res => ", res.data);

            // this.setState({ idLand: data })
          })
          this.props.history.push(`/myPage`)

          // if (this.state.fileList.length > 0) {
          //   this.upload(this.state.fileList).then(res => {
          //     const data = {
          //       id: this.state.idLand,
          //       url: res.data.file.filename
          //     }
          //     this.savePath(data)
          //   })
          // }
          // else {
          //   console.log("fileList : ", this.state.fileList)
          //   alert("No Image")
          // }
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

  componentDidMount = e => {
    let user = auth.getToken()
    if (user != null) {
      let userDecoded = auth.decodeToken(user)
      let userId = userDecoded.id
      let userFirstName = userDecoded.firstname
      let userLastName = userDecoded.lastname

      this.delayedShowMarker()
      this.saleLand(userId)
      // this.mySaleLand(userId)
      // this.setState({ user: userFirstName + ' ' + userLastName })
    } else {
      this.props.history.push(`/`)
    }
  }
  saleLand = async (userId) => {
    await axios.get(`${url}/lands/${this.props.match.params.id}`).then(async res => {
      const { data } = res
      await this.setState({ data });
      console.log("Data : ", this.state.data);
      await this.setState({ username: this.state.data.dataUser })
      console.log("Data : ", this.state.username);
      // await this.setState({ lat: data.lat })
      // await this.setState({ lng: data.lng })
      await this.setLatLng(data.lat, data.lng)
      await this.setState({ check: true })
      if (this.state.username.id !== userId) {
        this.props.history.push(`/`)
      } else {
        console.log("user correct");

      }

      // await this.setState({ price: this.formatNumber(data.price) })
      let images = []
      // const urlImage = "http://127.0.0.1:3001/"
      const urlImage = "http://167.71.193.2:3001/"

      let each = {
        original: urlImage + data.image,
        thumbnail: urlImage + data.image
      }
      images.push(each)
      this.setState({ images: images })

      this.props.form.setFieldsValue({
        title: data.title,
        detail: data.detail,
        price: data.price,
        area: data.area
      })
    })
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true })
    }, 3000)
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
    const { getFieldDecorator, } = this.props.form;
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
    const urlImage = "http://167.71.193.2:3001/"
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
                  rules: [{ required: true, message: 'Please input your detail!', whitespace: true, }],
                }, )(<TextArea placeholder="รายละเอียดเกี่ยวกับที่ดิน" style={{ height: '150px' }} />)}
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
                    พื้นที่&nbsp;
          </span>
                }
              >
                {getFieldDecorator('area', {
                  rules: [{ required: true, message: 'Please input your Area!', whitespace: true }],
                })(<TextArea placeholder="จำนวน 15 ไร่" style={{ height: '50px' }} />)}
              </Form.Item>

              {/* <Form.Item
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
              </Form.Item> */}


              <Form.Item
                label={
                  <span>
                    กรุณาเลือกจุดที่ต้องการ&nbsp;
          </span>
                }
              >
                <div className="">
                  {this.state.check == true &&
                    <AddMarker
                      isMarkerShown={this.state.isMarkerShown}
                      onMarkerClick={this.handleMarkerClick}
                      lat={this.state.lat}
                      lng={this.state.lng}
                      setLatLng={this.setLatLng}
                    />
                  }
                </div>
              </Form.Item>
              <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                  Update
            </Button>
              </Form.Item>

            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}
export default Form.create()(EditSaleLand);