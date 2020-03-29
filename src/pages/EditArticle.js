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
  Card,
  message,
  notification
} from 'antd';
import { Container } from 'reactstrap'
import { Link } from 'react-router-dom'
import axios, { post } from 'axios'
import url from '../../src/url_config'
import { stateToHTML } from "draft-js-export-html";
import { Editor, EditorState, RichUtils, convertToRaw , ContentState} from 'draft-js'
import DraftPasteProcessor from "draft-js/lib/DraftPasteProcessor"
import auth from "../service/index"

const styles = {
  editor: {
    border: '1px solid gray',
    minHeight: '6em'
  }
};

const { TextArea } = Input;
const { Option } = Select;
const gridStyle = {
  width: '25%',

};
class EditArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
      previewVisible: false,
      previewImage: "",
      fileList: [],
      data: [],
      file: null,
      idBlog: null,
      editorState: EditorState.createEmpty(),
      fileListImage: [],
      detailEditor: '',
      images:[]
    }

  }
  componentDidMount() {
    this.focusEditor();
    let user = auth.getToken()
    if (user != null) {
      let userDecoded = auth.decodeToken(user)
      let userId = userDecoded.id
      let userFirstName = userDecoded.firstname
      let userLastName = userDecoded.lastname
      let userRole = userDecoded.role

      if (userRole == 'admin') {
        this.getData()
      } else {
        this.props.history.push(`/`)
      }

      // this.getImage()
      // this.mySaleLand(userId)
      // this.setState({ user: userFirstName + ' ' + userLastName })
    } else {
      this.props.history.push(`/`)
    }
  }
  getData = async () => {
    await axios.get(`${url}/blogs/${this.props.match.params.id}`).then(async res => {
      const { data } = res
      this.setState({ data });
      console.log("Data : ", data);
      let images = []
      // const urlImage = "http://127.0.0.1:3013/"
      const urlImage = "https://www.chamnangroup.com/"
      
      data.dataImage.map(e => {
        let data = {
          id: e.id,
          image: urlImage + e.image,
        }
        images.push(data)
      })
      console.log("new : ", images);
      this.setState({ images: images })
      console.log("ImageData : ", this.state.images)
      
      this.props.form.setFieldsValue({
        title: data.title,
        // detail: data.detail,
        type: data.type,
        // area: data.area
      })
      let editorState
      const detail = data.detail.split("\n").join("<br/>")
      const processedHTML = DraftPasteProcessor.processHTML(detail)
      const contentState = ContentState.createFromBlockArray(processedHTML)
       editorState = EditorState.createWithContent(contentState)
      editorState = EditorState.moveFocusToEnd(editorState)
      await this.setState({ editorState : editorState})
      console.log("Editor State : ", this.state.editorState);
      
    })

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
  onChange = (editorState) => {
    const contentState = editorState.getCurrentContent();
    // .getPlainText()
    // console.log("contentState : ",contentState);
    // console.log('content state : ', JSON.stringify((convertToRaw(contentState))));
    // this.setState({ detailEditor:JSON.stringify((convertToRaw(contentState)))})

    this.setState({ editorState });
    this.setState({ editorContentHtml: stateToHTML(editorState.getCurrentContent()) })
    this.setState({ detailEditor: stateToHTML(editorState.getCurrentContent()) })
    console.log("State : ", this.state.editorContentHtml);
  }


  setEditor = (editor) => {
    this.editor = editor;
  };
  focusEditor = () => {
    if (this.editor) {
      this.editor.focus();
    }
  };

  onUnderlineClick = () => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
  }

  onBoldClick = () => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'))
  }

  onItalicClick = () => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'))
  }

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

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

  handleSubmit = (e) => {
    e.preventDefault();
    try {

      this.props.form.validateFieldsAndScroll(async (err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          // values.user_type = 'register'
          values.id = this.props.match.params.id
          values.detail = this.state.detailEditor
          console.log("Last Value : ",values);
          
          await axios.put(`${url}/blogs/edit`, values).then(res => {
            const { data } = res
            this.setState({ idBlog: data.id })
          })
          // this.upload(this.state.fileList).then(res => {

          //   const data = {
          //     id: this.state.idBlog,
          //     url: res.data.file.filename
          //   }
          //   this.savePath(data)
          // })
          // this.state.fileList.forEach(e => {
          //   console.log("e : ", e)
          //   this.upload(e).then(res => {
          //     const data = {
          //       id: this.state.idBlog,
          //       url: res.data.file.filename,
          //       type: 2
          //     }
          //     this.savePath(data)
          //   })
          // })
          if (this.state.fileList.length > 0) {
            this.upload(this.state.fileList).then(res => {
              const data = {
                id: this.props.match.params.id,
                url: res.data.file.filename
              }
              this.savePath(data)
            })
          }
          else {
            console.log("fileList : ", this.state.fileList)
            // alert("No Image")
          }
          this.props.history.push(`/allArticle`)
        }
      });

    } catch (error) {
      console.log("Catch : ", error);

      message.error('Please choose you Banner');
    }
  };
  handleUploadImage = ({ fileList }) => {

    console.log('fileList', fileList);
    this.setState({ fileListImage: fileList });

  }

  handleSubmitImage = event => {

    try {
      event.preventDefault();

      this.uploadImage(this.state.fileListImage).then(res => {
        const data = {
          id: this.props.match.params.id,
          url: res.data.file.filename,
          type: 2
        }
        this.savePathImage(data)
      })
      

    } catch (error) {
      console.log("Catch : ", error);

      message.error('Please choose you Banner');
    }

  };

  uploadImage = () => {
    const urlUpload = `${url}/images/uploadImage`
    const formData = new FormData()
    formData.append("imageData", this.state.fileListImage[0].originFileObj);
    // formData.append('imageData', file)
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    return post(urlUpload, formData, config)
  }

  savePathImage = async (data) => {
    await axios.put(`${url}/images/savePathImage`, data).then(res => {
      console.log("saved : ", res)
      this.setState({ fileListImage: [] })
    }).then(
      await this.getImage
    )
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOkImage = async e => {
    console.log(e);
    await this.handleSubmitImage(e)
    await this.setState({
      visible: false,
    })

  };

  handleCancelImage = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };


  handlePreviewImage = file => {
    this.setState({
      previewImage: file.thumbUrl,
      previewVisible: true
    });
  };
  removeImage = async (id) => {
    console.log("id => ", id);

    await axios.delete(`${url}/images/delBlog/${id}`).then(res => {
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

    if (type == 'success') {
      notification[type]({
        message: `Updated !`,
        description:
          `updated !`,
      });
    } else {
      notification[type]({
        message: 'Error !',
        description:
          'Error can not Update.',
      });
    }

  };

  getImage = e => {
    // e.preventDefault()
    axios.get(`${url}/blogs/${this.props.match.params.id}`).then(res => {
      const { data } = res
      this.setState({ data });
      console.log("DataImage : ", data);
      let images = []
      const urlImage = "http://127.0.0.1:3013/"
      // const urlImage = "https://www.chamnangroup.com/"
      data.dataImage.map(e => {
        let data = {
          id: e.id,
          image: urlImage + e.image,
        }
        images.push(data)
      })
      // this.setState({ image: urlImage + data.image })
      this.setState({ images: images })
    })
  }

  // upload = (each) => {
  //   const urlUpload = `${url}/images/uploadImage`
  //   const formData = new FormData()
  //   formData.append("imageData", each.originFileObj);
  //   const config = {
  //     headers: {
  //       'content-type': 'multipart/form-data'
  //     }
  //   }
  //   return post(urlUpload, formData, config)
  // }

  // savePath = async (data) => {
  //   await axios.put(`${url}/images/savePathImage`, data).then(res => {
  //     console.log("saved : ", res)
  //   })
  //   this.props.history.push(`/admin`)
  // }


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
    const { previewVisible, previewImage, fileList,fileListImage } = this.state;
    const urlImage = "https://www.chamnangroup.com/"
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
            <h1>สร้างบทความ</h1>
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
                })(<Input placeholder="หัวข้อของบทความ" />)}
              </Form.Item>

              <Form.Item
                label={
                  <span>
                    รายละเอียด&nbsp;
              </span>
                }
              >
                {/* {getFieldDecorator('detail', {
                  rules: [{ required: true, message: 'Please input your detail!', whitespace: true }],
                })(<TextArea placeholder="รายละเอียดเกี่ยวกับที่ดิน" style={{ height: '150px' }} />)} */}
                <Button type="button" onClick={this.onUnderlineClick}>U</Button>
                <Button type="button" onClick={this.onBoldClick}><b>B</b></Button>
                <Button type="button" onClick={this.onItalicClick}><em>I</em></Button>
                <div style={styles.editor} onClick={this.focusEditor}>
                  <Editor
                    handleKeyCommand={this.handleKeyCommand}
                    ref={this.setEditor}
                    editorState={this.state.editorState}
                    onChange={this.onChange}
                    placeholder=""
                  />
                </div>
              </Form.Item>

              {/* <Row>
                <Col>
                  <button onClick={this.onUnderlineClick}>U</button>
                  <button onClick={this.onBoldClick}><b>B</b></button>
                  <button onClick={this.onItalicClick}><em>I</em></button>
                  <div style={styles.editor} onClick={this.focusEditor}>
                    <Editor
                      handleKeyCommand={this.handleKeyCommand}
                      ref={this.setEditor}
                      editorState={this.state.editorState}
                      onChange={this.onChange}
                    />
                  </div>
                </Col>
              </Row> */}
              <Form.Item label="ประเภท" hasFeedback>
                {getFieldDecorator('type', {
                  rules: [{ required: true, message: 'กรุณาเลือกประเภทของบทความ !' }],
                })(
                  <Select placeholder="กรุณาเลือกประเภทของบทความ !">
                    <Option value="1">ข่าว</Option>
                    <Option value="2">บทความ</Option>
                    <Option value="3">กิจกรรม</Option>
                  </Select>,
                )}
              </Form.Item>

              <Form.Item
                label={
                  <span>
                    ภาพรายละเอียด&nbsp;
          </span>
                }
              >
                <div className="pb-5">
                  <div style={{ display: 'flex', flexDirection: 'row-reverse', margin: '10px' }}>
                    <Button type="primary" onClick={this.showModal}>
                      เพิ่มรูปภาพ
        </Button>
                  </div>
                  <div>
                    <Modal
                      title="เพิ่มรูปภาพ"
                      visible={this.state.visible}
                      onOk={this.handleOkImage}
                      onCancel={this.handleCancelImage}
                    >
                      <Row className="mt-4 d-flex justify-content-center">
                        <Col>
                          <div>
                            <Upload
                              listType="picture-card"
                              fileList={fileListImage}
                              onPreview={this.handlePreviewImage}
                              onChange={this.handleUploadImage}
                              beforeUpload={() => false}
                            >
                              {fileListImage.length >= 1 ? null : uploadButton}
                            </Upload>
                          </div>
                        </Col>
                        <Modal
                          visible={previewVisible}
                          footer={null}
                          onCancel={this.handleCancelImage}
                        >
                          <img alt="example" style={{ width: "100%" }} src={previewImage} />
                        </Modal>
                      </Row>
                    </Modal>
                  </div>
                  <Card>
                    {this.state.images.map(e => {
                      return (<div key={e.id} className="" >
                        <Card.Grid style={gridStyle} style={{  }}>
                        <div>
                          <img src={`${e.image}`} alt={e.image} className="img-fluid"/>
                          </div>
                          <div onClick={() => this.removeImage(e.id)} style={{ color: 'red', cursor: 'pointer' }}>Remove</div>
                        </Card.Grid>
                      </div>)
                    })}
                  </Card>
                </div>

              </Form.Item>

              {/* <Form.Item
                label={
                  <span>
                    กรุณาเลือกภาพหัวข้อของคุณ&nbsp;
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
                      {uploadButton}
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
              <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                  Update
                </Button>
              </Form.Item>

            </Form>
          </Col>
        </Row>
      </Container >
    )
  }
}
export default Form.create()(EditArticle);
