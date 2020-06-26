import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

function Welcome(props) {
    return (
        <>
        <h1>Which are you?</h1>
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
        </>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        setUserType: (userType) => dispatch({ type: 'SET_USER_TYPE', userType: userType})
    }
}

export default connect(null, mapDispatchToProps)(Welcome);