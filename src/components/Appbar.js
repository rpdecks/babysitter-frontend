import React from 'react'
import { Nav, Navbar, Col, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import styled from 'styled-components'
import { FaBabyCarriage } from 'react-icons/fa'

const Styles = styled.div ` 
    .navbar {
        background-color: #0097A7;
        max-height: 5vh;
    }
    .nav-link {
        color: white;
    }
    .navbar-brand {
        margin: 0;
    }
    .brand-text {
        color: white;
        font-size: 1.20rem;
        font-family: 'Pacifico', cursive;
    }
    .brand-img {
        margin-right: 1vw;
    }
    .right-btns {
        float: right;
    }
`

function Appbar(props) {
    function handleLogout() {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_type');
        props.logoutStateClear(undefined)
        props.logout()
        props.history.push('/') 
    }
    function renderButtons() {
        if (props.isLoggedIn) {
            return (
                <>
                <Row>
                    <Nav.Item>
                        <Nav.Link href="/newjob">
                            Post a Job
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link onClick={() => handleLogout()}>
                            Logout
                        </Nav.Link>
                    </Nav.Item>
                </Row>
                </>
            )
        }
    }
    return (
        <Styles>
            <Navbar bg='navbar' variant='dark' >
                <Col xs={2}>
                    <div className='brand-text'>
                        <FaBabyCarriage className='brand-img' />
                        Babysitter
                    </div>
                </Col>
                <Col xs={8} />
                <Col xs={2} className='right-btns'>
                <Navbar.Collapse>
                    <Nav>
                        <div >
                        {renderButtons()}
                        </div>
                    </Nav>
                </Navbar.Collapse>
                </Col>
            </Navbar>
        </Styles>
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
        logoutStateClear: (value) => dispatch({ type: 'USER_LOGGED_OUT', state: value })
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Appbar))