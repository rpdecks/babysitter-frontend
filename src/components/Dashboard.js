import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

function Dashboard(props) {

    function handleLogout() {
        localStorage.removeItem('auth_token');
        props.setLoginStatus(false)
    }
    return (
        <>
            





            <h1>Hello dashboard</h1>
            <Link to="/" onClick={() => handleLogout()}>
            <button type="button">
                Logout
            </button>
            </Link>
        </>
    )
}

const mapStateToProps = state => {
    return {
        userType: state.userReducer.userType
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setLoginStatus: (status) => dispatch({ type: 'SET_LOGIN_STATUS', isLoggedIn: status})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);