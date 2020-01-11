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


import { Container, Row, Col } from 'reactstrap'
import './Home.css'
// import { Editor, EditorState, RichUtils, convertToRaw } from 'draft-js'
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
                {/* <Header /> */}
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
                    <Row className="mt-5">
                        <Col md={3} sm={12}>
                            <div className="home-menu mt-2 mb-2">
                                <a href="http://deka.supremecourt.or.th/" style={{ color: '#f90' }}>
                                    <div className="each-menu p-2 mb-2">
                                        <img src={image1} className="mr-2 menu-image" alt="image1" />
                                        ฎีกา
                                </div>
                                </a>

                                <a href="http://www.led.go.th" style={{ color: '#f90' }}>
                                    <div className="each-menu p-2 mt-2 mb-2">
                                        <img src={image2} className="mr-2 menu-image" alt="image2" />กรมบังคับคดี
                                    </div>
                                </a>

                                <a href="https://www.dol.go.th" style={{ color: '#f90' }}>
                                    <div className="each-menu p-2 mt-2 mb-2">
                                        <img src={image3} className="mr-2 menu-image" alt="image3" />กรมที่ดิน
                                    </div>
                                </a>

                                <a href="https://www.dbd.go.th" style={{ color: '#f90' }}>
                                    <div className="each-menu p-2 mt-2">
                                        <img src={image4} className="menu-image" alt="image4" />   กรมพัฒนาธุรกิจการค้า
                                </div>
                                </a>
                            </div>
                        </Col>
                        <Col md={9} sm={12} >
                            <CardNews />
                        </Col>
                    </Row>

                    <Row>
                        <Col><div style={{ textAlign:'center', fontSize:'36px', padding:'20px'}}>ประกาศขาย</div></Col>
                    </Row>
                    <Row>
                        <CardLands />
                    </Row>
                </Container>
            </div >
        )
    }
}
