import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Modal, Button } from 'react-bootstrap'

function Welcome(props) {

    return (
        <Modal    
            show={!props.userType}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header>
                <Modal.Title>Welcome to Babysitters</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Choose the option which best describes you to get started
            </Modal.Body>
            <Modal.Footer>
                <Link to="/login" onClick={() => props.setUserType('employer')}>
                    <button type="button">
                        Employer
                    </button>
                </Link>
                <Link to="/login" onClick={() => props.setUserType('caregiver')}>
                    <button type="button">
                        Caregiver
                    </button>
                </Link>
            </Modal.Footer>
        </Modal>
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