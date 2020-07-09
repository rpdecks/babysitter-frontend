import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Button, Col, Modal, Row } from 'react-bootstrap'
import { FaBabyCarriage } from 'react-icons/fa'
import styled from 'styled-components'

const Styles = styled.div ` 
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
                    <div className='modal-title'>
                <Modal.Header>
                    <Modal.Title style={{ margin: 'auto', fontFamily: 'Pacifico', color: '#0097A7' }} >
                            <FaBabyCarriage />
                            Babysitter!
                            <FaBabyCarriage />
                    </Modal.Title>
                </Modal.Header>
                    </div>
                <Modal.Body style={{ textAlign: 'center', color: '#757575'}}>
                            <b>Meeting the needs of <em>families</em> and caregivers</b><hr />
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
        userType: state.userReducer.userType
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setUserType: (userType) => dispatch({ type: 'SET_USER_TYPE', userType: userType})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);