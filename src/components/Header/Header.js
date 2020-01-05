import React, { Component } from 'react'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';
import './Header.css'
import logo from '../../images/logo.jpg'
import { Link } from "react-router-dom";
import { useAuth0 } from "../../react-auth0-spa";
import auth from "../../service/index"
// const LoginFB = () => {
//   const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
//   return (
//     <div>
//       {!isAuthenticated && (
//          <NavLink href="/login">Login</NavLink>
//       )}

//       {/* {isAuthenticated && <button onClick={() => logout()}>Log out</button>} */}
//       {isAuthenticated && <NavLink href="/login" onClick={() => logout()}>LogOut</NavLink>}
//       {/* {isAuthenticated && (
//         <span>
//           <Link to="/">Home</Link>&nbsp;
//         <Link to="/profile">Profile</Link>
//         </span>
//       )} */}
//     </div>
//   );
// }


export default class Header extends Component {
    state = {
        isOpen: false,
        dropdownOpen: false,

        isOpen2: false,
        dropdownOpen2: false,

        isOpen3: false,
        dropdownOpen3: false,

        isOpen4: false,
        dropdownOpen4: false,

        user: null

    }
    toggle = () => {
        this.setState({ isOpen: !this.state.isOpen })
    }
    onMouseEnter = () => {
        this.setState({ dropdownOpen: true });
    }

    onMouseLeave = () => {
        this.setState({ dropdownOpen: false });
    }

    toggle1 = () => {
        this.setState({ isOpen1: !this.state.isOpen1 })
    }
    onMouseEnter1 = () => {
        this.setState({ dropdownOpen1: true });
    }

    onMouseLeave1 = () => {
        this.setState({ dropdownOpen1: false });
    }


    toggle2 = () => {
        this.setState({ isOpen2: !this.state.isOpen2 })
    }
    onMouseEnter2 = () => {
        this.setState({ dropdownOpen2: true });
    }

    onMouseLeave2 = () => {
        this.setState({ dropdownOpen2: false });
    }

    toggle3 = () => {
        this.setState({ isOpen3: !this.state.isOpen3 })
    }
    onMouseEnter3 = () => {
        this.setState({ dropdownOpen3: true });
    }

    onMouseLeave3 = () => {
        this.setState({ dropdownOpen3: false });
    }

    toggle4 = () => {
        this.setState({ isOpen4: !this.state.isOpen4 })
    }
    onMouseEnter4 = () => {
        this.setState({ dropdownOpen4: true });
    }

    onMouseLeave4 = () => {
        this.setState({ dropdownOpen4: false });
    }

    logOut = () => {
        auth.clearToken()
        this.props.history.push('/')
    }

    // componentWillReceiveProps = nextProps => {
    //     if (nextProps.user !== null) {
    //         console.log("nestProps : ", nextProps);
    //         // this.setState({ user: nextProps.user.data.token });
    //         // console.log("user : ",this.state.user);
    //         let user = auth.getToken()
    //         let userDecoded = auth.decodeToken(user)
    //         let userId = userDecoded.id
    //         let userFirstName = userDecoded.firstname
    //         let userLastName = userDecoded.lastname

    //         this.setState({ user: userFirstName })
    //     }
    // };

    render() {

        return (
            <div>
                <Navbar expand="md" style={{ backgroundColor: '#f90' }} dark>
                    <NavbarBrand href="/" style={{ color:'#fff'}}><img src={logo} className="img-fluid mr-3" style={{ maxWidth: '50px' }} alt="logo" />ChamnanGroup</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>

                            <NavItem>
                                <NavLink href="/" className="nav-color">หน้าแรก</NavLink>
                            </NavItem>

                            <Dropdown nav inNavbar onMouseOver={this.onMouseEnter1} onMouseLeave={this.onMouseLeave1} isOpen={this.state.dropdownOpen1} toggle={this.toggle1}>
                                <DropdownToggle nav className="nav-color">
                                    เกี่ยวกับองค์กร
                                    </DropdownToggle>
                                <DropdownMenu right  className="">
                                    <DropdownItem href="/aboutCompany/vision">
                                        วิสัยทัศน์
                                    </DropdownItem>
                                    <DropdownItem href="/aboutCompany/structure">
                                        โครงสร้างองค์กร
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
 
                            <Dropdown nav inNavbar onMouseOver={this.onMouseEnter2} onMouseLeave={this.onMouseLeave2} isOpen={this.state.dropdownOpen2} toggle={this.toggle2}>
                                <DropdownToggle nav className="nav-color">
                                    ปรึกษา
                                    </DropdownToggle>
                                <DropdownMenu right className="">
                                    <DropdownItem>
                                        ปรึกษา 1
                                        </DropdownItem>
                                    <DropdownItem>
                                        ปรึกษา 2
                                        </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>

                            <NavItem>
                                <NavLink href="/allArticle" className="nav-color">บทความ/ข่าว</NavLink>
                            </NavItem>

                            <NavItem>
                                <NavLink href="/allSaleLand" className="nav-color">ขายที่ดิน</NavLink>
                            </NavItem>
                            <NavItem>
                                {/* <NavLink href="/login">Login</NavLink> */}

                                {/* <LoginFB/> */}
                                {/* {this.state.user && <NavLink href="/login" onClick={() => logout()}>LogOut</NavLink>} */}

                                {/* {!this.state.user && (
                                    <NavLink href="/login">Login</NavLink>
                                )}
                                 {this.state.user && (
                                    <NavLink href="/">LogOut</NavLink>
                                )} */}
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        )
    }
}
