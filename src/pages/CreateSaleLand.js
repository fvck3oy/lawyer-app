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

import auth from "../service/index"
import { Editor, EditorState, RichUtils, convertToRaw } from 'draft-js'
import { stateToHTML } from "draft-js-export-html";
import './CreateSaleLand.css'
import { Translation } from 'react-i18next';
const styles = {
  editor: {
    border: '1px solid gray',
    minHeight: '6em'
  }
};
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
          // console.log("Position : ", position.toString());
          const latlong = position.toString().replace('(', '').split(',');
          // console.log("LatLng : ", latlong);

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

    previewVisible2: false,
    previewImage2: "",
    fileList2: [],

    file: null,
    idLand: null,

    editorState: EditorState.createEmpty(),
    detailEditor:''
  };

  onChange = (editorState) => {
    const contentState = editorState.getCurrentContent();
    // .getPlainText()
    // console.log("contentState : ",contentState);
    // console.log('content state : ', JSON.stringify((convertToRaw(contentState))));
    // this.setState({ detailEditor:JSON.stringify((convertToRaw(contentState)))})

    this.setState({ editorState });
    this.setState({ editorContentHtml: stateToHTML(editorState.getCurrentContent())})
    this.setState({ detailEditor : stateToHTML(editorState.getCurrentContent()) })
    // console.log("State : ", this.state.detailEditor);
  }
  setEditor = (editor) => {
    this.editor = editor;
  };
  focusEditor = () => {
    if (this.editor) {
      this.editor.focus();
    }
  };
  setLatLng = async (lat, lng) => {
    // console.log('set Lat : ', lat);
    // console.log('set Lng : ', lng);
    await this.setState({ lat: lat })
    await this.setState({ lng: lng })
  }


  handleSubmit = (e) => {
    e.preventDefault();
    try {
      this.props.form.validateFieldsAndScroll(async (err, values) => {
        let user = auth.getToken()
        let userDecoded = auth.decodeToken(user)
        let userId = userDecoded.id

        if (!err) {
          // console.log('value Lat : ', this.state.lat);
          // console.log('value Lng : ', this.state.lng);
          values.user = userId
          values.lat = this.state.lat
          values.lng = this.state.lng
          values.user_type = 'register'
          values.detail = this.state.detailEditor

          // console.log('Received values of form: ', values);
          await axios.post(`${url}/lands/create`, values).then(res => {
            const { data } = res
            this.setState({ idLand: data.id })
          })

          if (this.state.fileList.length > 0) {
            this.upload(this.state.fileList).then(res => {
              const data = {
                id: this.state.idLand,
                url: res.data.file.filename
              }
              this.savePath(data)
            })
          }
          else {
            // console.log("fileList : ", this.state.fileList)
            alert("No Image")
          }
          if (this.state.fileList2.length > 0) {

            this.state.fileList2.forEach(e => {
              // console.log("e : ", e)
              this.upload2(e).then(res => {
                const data = {
                  id: this.state.idLand,
                  url: res.data.file.filename,
                  type: 1
                }
                this.savePath2(data)
              })
            })
          }
          else {
            // console.log("fileList2 : ", this.state.fileList2)
            alert("No Image Detail")
          }
          this.props.history.push(`/myPage`)
        }
      });

    } catch (error) {
      // console.log("Catch : ", error);

      message.error('Please choose you Banner');
    }
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  componentDidMount() {
    this.focusEditor();
    this.delayedShowMarker()
  }

  onItalicClick = () => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'))
  }

  handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  onUnderlineClick = () => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
  }

  onBoldClick = () => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'))
  }

  onItalicClick = () => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'))
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

  upload2 = (each) => {
    const urlUpload = `${url}/images/uploadImage`
    const formData = new FormData()
    formData.append("imageData", each.originFileObj);
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
      // console.log("saved : ", res)
    })
    // this.props.history.push(`/`)
  }
  savePath2 = async (data) => {
    await axios.put(`${url}/images/savePathImage`, data).then(res => {
      // console.log("saved : ", res)
    })
    // this.props.history.push(`/`)
  }

  handleCancel = () => this.setState({ previewVisible: false });

  handleCancel2 = () => this.setState({ previewVisible2: false });

  handlePreview = file => {
    this.setState({
      previewImage: file.thumbUrl,
      previewVisible: true
    });
  };

  handlePreview2 = file => {
    this.setState({
      previewImage2: file.thumbUrl,
      previewVisible2: true
    });
  };

  handleUpload = ({ fileList }) => {

    // console.log('fileList', fileList);
    this.setState({ fileList });

  }

  handleUpload2 = ({ fileList }) => {

    // console.log('fileList2', fileList);
    this.setState({ fileList2: fileList });

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
    const { previewVisible2, previewImage2, fileList2 } = this.state;
    const urlImage = "https://www.chamnangroup.com/"
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    const uploadButton2 = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return (
      <Translation>{t=>
      <Container>
        <Row className="p-5">
          <Col>
            <h1>{t('create_land_page.preTitle')}</h1>
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
              <Form.Item
                label={
                  <span>
                    {t('create_land_page.title')}&nbsp;
              </span>
                }
              >
                {getFieldDecorator('title', {
                  rules: [{ required: true, message: 'Please input your title!', whitespace: true }],
                })(<Input placeholder={t('create_land_page.title')} />)}
              </Form.Item>

              <Form.Item
                label={
                  <span>
                    {t('create_land_page.detail')}&nbsp;
              </span>
                }
              >
                {/* {getFieldDecorator('detail', {
                  rules: [{ required: true, message: 'Please input your detail!', whitespace: true }],
                })(<TextArea placeholder="รายละเอียดเกี่ยวกับที่ดิน" style={{ height: '150px' }} />)} */}
                <Button type="button"  onClick={this.onUnderlineClick}>U</Button>
                <Button type="button"  onClick={this.onBoldClick}><b>B</b></Button>
                <Button type="button"  onClick={this.onItalicClick}><em>I</em></Button>
                <div style={styles.editor} onClick={this.focusEditor}>
                  <Editor
                  // style={{ color:'red'}}
                  //   className="RichEditor-editor"
                    handleKeyCommand={this.handleKeyCommand}
                    ref={this.setEditor}
                    editorState={this.state.editorState}
                    onChange={this.onChange}
                    placeholder=""
                  />
                </div>
              </Form.Item>

              <Form.Item
                label={
                  <span>
                    {t('create_land_page.price')} &nbsp;
              </span>
                }
              >
                {getFieldDecorator('price', {
                  rules: [{ required: true, message: 'Please input your price!!' }],
                })(<InputNumber placeholder={t('create_land_page.price')} />)}
              </Form.Item>

              <Form.Item
                label={
                  <span>
                    {t('create_land_page.area')}&nbsp;
              </span>
                }
              >
                {getFieldDecorator('area', {
                  rules: [{ required: true, message: 'Please input your Area!', whitespace: true }],
                })(<TextArea placeholder="จำนวน 15 ไร่" style={{ height: '50px' }} />)}
              </Form.Item>

              <Form.Item
                label={
                  <span>
                    {t('create_land_page.chooseCover')}&nbsp;
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
                    {t('create_land_page.chooseDetail')}&nbsp;
              </span>
                }
              >
                <div className="">
                  <div>
                    <Upload
                      listType="picture-card"
                      fileList={fileList2}
                      onPreview={this.handlePreview2}
                      onChange={this.handleUpload2}
                      beforeUpload={() => false} // return false so that antd doesn't upload the picture right away
                    >
                      {uploadButton2}
                    </Upload>
                  </div>
                  <Modal
                    visible={previewVisible2}
                    footer={null}
                    onCancel={this.handleCancel2}
                  >
                    <img alt="example" style={{ width: "100%" }} src={previewImage2} />
                  </Modal>
                </div>
              </Form.Item>


              <Form.Item
                label={
                  <span>
                    {t('create_land_page.choosePoint')}&nbsp;
              </span>
                }
              >
                <div className="">
                  <AddMarker
                    isMarkerShown={this.state.isMarkerShown}
                    onMarkerClick={this.handleMarkerClick}
                    lat={this.state.lat}
                    lng={this.state.lng}
                    setLatLng={this.setLatLng}
                  />
                </div>
              </Form.Item>
              <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                  {t('create_land_page.create')}
                </Button>
              </Form.Item>

            </Form>
          </Col>
        </Row>
      </Container>}
      </Translation>
    );
  }
}
export default Form.create()(CreateSaleLands);