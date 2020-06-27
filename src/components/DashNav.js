import React from 'react'
import { Nav, Navbar, Col } from 'react-bootstrap'
import { connect } from 'react-redux'

function DashNav(props) {

    if (props.isLoggedIn) {
        return (
            <Navbar>
                <Navbar.Collapse>
                    <Col>
                        <Nav>
                            <Nav.Item>
                                <Nav.Link>
                                    Jobs
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col>
                        <Nav>
                            <Nav.Item>
                                <Nav.Link>
                                    Browse
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col>
                        <Nav>
                            <Nav.Item>
                                <Nav.Link>
                                    Reviews
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col>
                        <Nav>
                            <Nav.Item>
                                <Nav.Link>
                                    Messages
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                </Navbar.Collapse>
            </Navbar>
        )} else return <Navbar />
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.userReducer.isLoggedIn
    }
}

export default connect(mapStateToProps)(DashNav)