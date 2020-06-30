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
                                <Nav.Link href="/jobs">
                                    {window.location.pathname === '/jobs' ? <b><u>Jobs</u></b> : 'Jobs'}
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col>
                        <Nav>
                            <Nav.Item>
                                <Nav.Link>
                                    {window.location.pathname === '/browse' ? <b><u>Browse</u></b> : 'Browse'}
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col>
                        <Nav>
                            <Nav.Item>
                                <Nav.Link>
                                    {window.location.pathname === '/reviews' ? <b><u>Reviews</u></b> : 'Reviews'}
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col>
                        <Nav>
                            <Nav.Item>
                                <Nav.Link>
                                    {window.location.pathname === '/messages' ? <b><u>Messages</u></b> : 'Messages'}
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