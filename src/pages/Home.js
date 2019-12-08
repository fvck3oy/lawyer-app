import React, { Component } from 'react'
import Banner from '../components/Banner/Banner'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import CardLands from '../components/CardLand/CardLand';
import CardNews from '../components/CardNews/CardNews'

import image1 from '../images/image1.png'
import image2 from '../images/image2.png'
import image3 from '../images/image3.png'
import image4 from '../images/image4.png'
import qrLine from '../images/qr_line.jpg'

import { Container, Row, Col } from 'reactstrap'
import './Home.css'
import { Editor, EditorState, RichUtils, convertToRaw } from 'draft-js'
// const styles = {
//     editor: {
//         border: '1px solid gray',
//         minHeight: '6em'
//     }
// };

export default class Home extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         editorState: EditorState.createEmpty()
    //     };
    //     this.onChange = (editorState) => {
    //         const contentState = editorState.getCurrentContent();
    //         console.log('content state', convertToRaw(contentState));
    //         this.setState({ editorState });
    //         console.log("State : ", this.state.editorState);
    //     }
    //     this.setEditor = (editor) => {
    //         this.editor = editor;
    //     };
    //     this.focusEditor = () => {
    //         if (this.editor) {
    //             this.editor.focus();
    //         }
    //     };
    // }

    // componentDidMount() {
    //     this.focusEditor();
    // }

    // onItalicClick = () => {
    //     this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'))
    // }

    // handleKeyCommand = (command) => {
    //     const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
    //     if (newState) {
    //         this.onChange(newState);
    //         return 'handled';
    //     }
    //     return 'not-handled';
    // }

    // onUnderlineClick = () => {
    //     this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
    // }

    // onBoldClick = () => {
    //     this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'))
    // }

    // onItalicClick = () => {
    //     this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'))
    // }

    render() {
        return (
            <div>
                <Header />
                <Banner />
                <Container className="pt-2 pb-5">
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
                    <Row>
                        <Col md={3} className="mt-2 mb-2">
                            <div className="home-menu mt-2">
                                <div className="each-menu p-2 mb-2">
                                <img style={{ width: '50px' }} src={image1} className="img-fluid mr-2" alt="image1" />ฎีกา
                                </div>
                                <div className="each-menu p-2 mt-2 mb-2">
                                <img style={{ width: '50px' }} src={image2} className="img-fluid mr-2" alt="image2" />กรมบังคับคดี
                                </div>
                                <div className="each-menu p-2 mt-2 mb-2">
                                <img style={{ width: '50px' }} src={image3} className="img-fluid mr-2" alt="image3" />กรมที่ดิน
                                </div>
                                <div className="each-menu p-2 mt-2">
                                <img style={{ width: '50px' }} src={image4} className="img-fluid mr-2" alt="image4" />กรมพัฒนาธุรกิจการค้า
                                </div>
                            </div>
                        </Col>
                        <Col md={9}>
                            <CardNews />
                        </Col>
                    </Row>
                    <Row>
                        <CardLands />
                    </Row>
                    <Row>
                        <Col md={3} className="d-flex justify-content-center align-items-center"><div><img src={qrLine} className="img-fluid" alt={qrLine} /></div></Col>
                        <Col md={9} className="p-5">ชำนาญกรุ๊ป เลขที่ตั้ง 200/94 ซอยนวลจันทร์ 9 เเขวงนวลจันทร์ เขตบึงกุ่ม กรุงเทพฯ 10230<br />
                            โทร. 02-9461171-5<br />
                            Fax 02-106-2114 </Col>
                    </Row>
                </Container>
                <Footer />
            </div>
        )
    }
}
