import React from 'react'
import { Nav, Navbar, Col } from 'react-bootstrap'
import { connect } from 'react-redux'

function Appbar(props) {
    function handleLogout() {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_type');
        props.setUserType(null)
        props.logout()
    }
    function renderButtons() {
        if (props.isLoggedIn) {
            return (
                <>
                    <Nav.Item>
                        <Nav.Link>
                            Post a Job
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link>
                            My Account
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link onClick={() => handleLogout()}>
                            Logout
                        </Nav.Link>
                    </Nav.Item>
                </>
            )
        }
    }
    return (
        <Navbar bg='dark' variant='dark'>
          <Col xs={2}>
                <Navbar.Brand>Babysitter</Navbar.Brand>
          </Col>
          <Navbar.Collapse>
                <Col xs={8}>    
                </Col>
                <Col xs={4}>
                    <Nav>
                        {renderButtons()}
                    </Nav>
                </Col>
            </Navbar.Collapse>
        </Navbar>
    )
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.userReducer.isLoggedIn
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: (status) => dispatch({type: 'LOGOUT', isLoggedIn: status}),
        setUserType: (userType) => dispatch({ type: 'SET_USER_TYPE', userType: userType}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Appbar)