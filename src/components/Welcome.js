import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Button, Col, Modal, Row } from 'react-bootstrap'
import { FaBabyCarriage } from 'react-icons/fa'
import styled from 'styled-components'

const Styles = styled.div ` 
    font-family: 'Roboto', sans-serif;

    .header-text {
        font-family: 'Pacifico', cursive;
        text-align: center;
        font-size: xx-large;
        color: #0097A7;
        margin-top: 20vh;
    }
  .brand {
    text-align: center;
    font-size: xxx-large;
    color: #0097A7;
    font-family: 'Pacifico', cursive;
  }
  .instructions {
    text-align: center;
    font-size: medium;
    color: #757575;
    margin-top: 1rem; 
    margin-bottom: 1rem; 
  }
    .btn {
        background: blue;
    }
    .button-row {
        justify-content: center;
        width: 100%;
        background: blue;
    } 
    .modal-title {
        color: white;
        font-size: 1.20rem;
        font-family: 'Pacifico', cursive;
    }
    .brand-img {
        margin-right: 1rem;
    }
    .top-row {
        height: 20vh;
    }
    .bottom-row {
        height: 20vh;
    }
    .motto {
        text-align: center;
        font-size: medium;
        color: #0097A7;
        font-family: 'Pacifico', cursive;
    }
    .brand-img-left {
        margin-right: .1rem;
    }
    .brand-img-right {
        margin-left: .1rem;
    }
`

function Welcome(props) {

    const handleClick = (value) => {
        localStorage.setItem("userType", value)
        props.setUserType(value)
    }
    const handleStartClick = (value) => {
        props.showUserTypeModal(value)
    }

    return (
        <Styles>
                <Row>
                    <div className='header-text mx-auto' >
                        Welcome to
                    </div>
                </Row>
                <Row>
                    <div className='brand mx-auto'>
                    <FaBabyCarriage className='brand-img-left'/>
                        Babysitter
                    <FaBabyCarriage className='brand-img-right'/>
                    </div>
                </Row>
                <Row>
                    <Button 
                        style={{ backgroundColor: "#00BCD4", color: 'white', border: '0', marginLeft: '5px', marginTop: '1.3rem', marginBottom: '1.2rem' }} 
                        className='mx-auto'
                        onClick={() => handleStartClick(true)}
                    >
                        Get Started!
                    </Button>
                </Row>
                <Row>
                    <div className='motto mx-auto'>
                        Connecting those in need with those who care
                    </div>
                </Row>
            <Modal
                show={props.showModal}
                backdrop="static"
                keyboard={false}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                animation={true}
                dialogClassName="custom-modal"
            >
                <Modal.Header>
                    <Modal.Title style={{ margin: 'auto', fontFamily: 'Pacifico', color: '#0097A7' }} >
                            <FaBabyCarriage />
                                Babysitter
                            <FaBabyCarriage />
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ textAlign: 'center', color: '#757575'}}>
                            <b>Meeting the needs of <em>families</em> and caregivers</b><br />
                            Need a job? Need a sitter?<br />
                            Create an account, browse opportunites,<br />
                            post a job, find a job, and win together
                </Modal.Body>
                <Modal.Footer style={{ color: '#757575'}}>
                    <Col>
                        <Row className='justify-content-center'>
                            <b>Choose the best option and get started</b>
                        </Row>
                    <Row className='justify-content-center'>
                        <Link to="/login" onClick={() => handleClick('employer')} className='button-row'>
                            <Button style={{ backgroundColor: "#0097A7", color: 'white', border: '0', marginRight: '5px', marginTop: '10px' }}>
                                Employer
                            </Button>
                        </Link>
                        <Link to="/login" onClick={() => handleClick('caregiver')}>
                            <Button style={{ backgroundColor: "#0097A7", color: 'white', border: '0', marginLeft: '5px', marginTop: '10px' }}>
                                Caregiver
                            </Button>
                        </Link>
                    </Row>
                    </Col>
                </Modal.Footer>
            </Modal>
        </Styles>
    )
}

const mapStateToProps = state => {
    return {
        userType: state.userReducer.userType,
        showModal: state.userReducer.showModal
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setUserType: (userType) => dispatch({ type: 'SET_USER_TYPE', userType: userType}),
        showUserTypeModal: (value) => dispatch({ type: 'SHOW_USER_TYPE_MODAL', showModal: value})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);