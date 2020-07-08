import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Col, Modal, Row } from 'react-bootstrap'
import styled from 'styled-components'

const Styles = styled.div ` 
  btn.row {
      background: blue;
      justify-content: center;
      width: 100%;
  } 
`

function Welcome(props) {

    const handleClick = (value) => {
        localStorage.setItem("userType", value)
        props.setUserType(value)
    }

    return (
        <Styles>
            <Modal    
                show={!props.userType}
                backdrop="static"
                keyboard={false}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                animation={true}
                dialogClassName="custom-modal"
            >
                <Modal.Header>
                    <Modal.Title style={{ margin: 'auto' }} >Welcome to Babysitter!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col xs={2}>
                            <img src='https://babysitters-app.s3.amazonaws.com/babysitter_img.jpeg' 
                                height='128' 
                                width='128' 
                                alt='pacifier'
                            />
                            <br />
                        </Col>
                        <Col xs={10}>
                            <b>Meeting the needs of both families and caregivers.</b><hr />
                            Find babysitters and find jobs right here. Create an account, browse opportunites, post a job, find a job, and win together
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer  >
                    <Row className='justify-content-center'>
                        Choose the option which best describes you to get started
                    <div className='btn-row'>
                        <Link to="/login" onClick={() => handleClick('employer')}>
                            <button type="button">
                                Employer
                            </button>
                        </Link>
                        <Link to="/login" onClick={() => handleClick('caregiver')}>
                            <button type="button">
                                Caregiver
                            </button>
                        </Link>
                    </div>
                    </Row>
                </Modal.Footer>
            </Modal>
        </Styles>
    )
}

const mapStateToProps = state => {
    return {
        userType: state.userReducer.userType
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setUserType: (userType) => dispatch({ type: 'SET_USER_TYPE', userType: userType})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);