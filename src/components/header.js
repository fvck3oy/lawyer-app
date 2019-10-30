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
    DropdownItem
} from 'reactstrap';
export default class Header extends Component {
    state = {
        isOpen: false,
        dropdownOpen:false
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
    render() {
        return (
            <div className="nav-color">
                <Navbar expand="md" style={{ backgroundColor: '#f90', color: 'white' }}>
                    <NavbarBrand href="/">ชำนาญกรุ๊ป</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            
                            <NavItem>
                                <NavLink href="/components/">หน้าแรก</NavLink>
                            </NavItem>
                            <Dropdown nav inNavbar onMouseOver={this.onMouseEnter} onMouseLeave={this.onMouseLeave} isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                <DropdownToggle nav>
                                    เกี่ยวกับองค์กร
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        Option 1
                                    </DropdownItem>
                                    <DropdownItem>
                                        Option 2
                                    </DropdownItem>
                                    
                                </DropdownMenu>
                            </Dropdown>
                            <Dropdown nav inNavbar onMouseOver={this.onMouseEnter} onMouseLeave={this.onMouseLeave} isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                <DropdownToggle nav>
                                    ปรึกษา
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        Option 1
                                    </DropdownItem>
                                    <DropdownItem>
                                        Option 2
                                    </DropdownItem>
                                    
                                </DropdownMenu>
                            </Dropdown>
                            <Dropdown nav inNavbar onMouseOver={this.onMouseEnter} onMouseLeave={this.onMouseLeave} isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                <DropdownToggle nav>
                                    บทความ/ข่าว
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        Option 1
                                    </DropdownItem>
                                    <DropdownItem>
                                        Option 2
                                    </DropdownItem>
                                    
                                </DropdownMenu>
                            </Dropdown>
                            <Dropdown nav inNavbar onMouseOver={this.onMouseEnter} onMouseLeave={this.onMouseLeave} isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                                <DropdownToggle nav>
                                    ขายที่ดิน
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        Option 1
                                    </DropdownItem>
                                    <DropdownItem>
                                        Option 2
                                    </DropdownItem>
                                    
                                </DropdownMenu>
                            </Dropdown>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        )
    }
}
