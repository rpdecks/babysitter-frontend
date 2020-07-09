import React from 'react'
import { Nav, Navbar, Col, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import styled from 'styled-components'
import { FaBabyCarriage } from 'react-icons/fa'

const Styles = styled.div ` 
    font-family: 'Roboto', sans-serif;
    .navbar {
        background-color: #0097A7;
        max-height: 8vh;
    }
    .nav-link:link {
        color: white;
        font-size: small;
        margin: auto;
    }
    .nav-item {
        text-align: right;
    }
    .navbar-brand {
        margin: 0;
    }
    .brand-text {
        color: white;
        font-size: 1.20rem;
        font-family: 'Pacifico', cursive;
    }
    .brand-img-left {
        margin-right: .1rem;
    }
    .brand-img-right {
        margin-left: .1rem;
    }
    .right-btns {
        text-align: right;
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
                    {props.userType === 'employer' ?
                        <Nav.Item>
                            <Nav.Link href="/newjob">
                                Post a Job
                            </Nav.Link>
                        </Nav.Item>
                        :
                        null
                    }
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
                <Col xs={3}>
                    <div className='brand-text'>
                        <FaBabyCarriage className='brand-img-left' />
                        Babysitter
                        <FaBabyCarriage className='brand-img-right' />
                    </div>
                </Col>
                <Col xs={7} />
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
        isLoggedIn: state.userReducer.isLoggedIn,
        userType: state.userReducer.userType,
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