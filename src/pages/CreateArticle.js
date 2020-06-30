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
import { stateToHTML } from "draft-js-export-html";
import { Editor, EditorState, RichUtils, convertToRaw } from 'draft-js'
const styles = {
  editor: {
    border: '1px solid gray',
    minHeight: '6em'
  }
};

const { TextArea } = Input;
const { Option } = Select;

class CreateArticle extends Component {
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

      detailEditor: ''
    }
  
  }
  componentDidMount() {
    this.focusEditor();
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
    this.setState({ editorContentHtml: stateToHTML(editorState.getCurrentContent())})
    this.setState({ detailEditor : stateToHTML(editorState.getCurrentContent()) })
    // console.log("State : ", this.state.editorContentHtml);
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

    // console.log('fileList', fileList);
    this.setState({ fileList });

  }

  handleSubmit = (e) => {
    e.preventDefault();
    try {

      this.props.form.validateFieldsAndScroll(async (err, values) => {
        if (!err) {
          // console.log('Received values of form: ', values);
          values.user_type = 'register'
          values.detail = this.state.detailEditor
          await axios.post(`${url}/blogs/create`, values).then(res => {
            const { data } = res
            this.setState({ idBlog: data.id })
          })
          this.upload(this.state.fileList).then(res => {
            
            const data = {
              id: this.state.idBlog,
              url: res.data.file.filename
            }
            this.savePath1(data)
          })
          this.state.fileList.forEach(e => {
            // console.log("e : ", e)
            this.upload(e).then(res => {
              const data = {
                id: this.state.idBlog,
                url: res.data.file.filename,
                type: 2
              }
              this.savePath(data)
            })
          })

        }
      });

    } catch (error) {
      // console.log("Catch : ", error);

      message.error('Please choose you Banner');
    }
  };

  upload = (each) => {
    const urlUpload = `${url}/images/uploadImage`
    const formData = new FormData()
    formData.append("imageData", each.originFileObj);
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    return post(urlUpload, formData, config)
  }

  savePath1 = async (data) => {
    await axios.put(`${url}/blogs/savePathImage`, data).then(res => {
      // console.log("saved : ", res)
    })
    // this.props.history.push(`/admin`)
  }

  savePath = async (data) => {
    await axios.put(`${url}/images/savePathImage`, data).then(res => {
      // console.log("saved : ", res)
    })
    this.props.history.push(`/admin`)
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
              </Form.Item>
              <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                  Create
                </Button>
              </Form.Item>

            </Form>
          </Col>
        </Row>
      </Container >
    )
  }
}
export default Form.create()(CreateArticle);
