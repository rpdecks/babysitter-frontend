import React from 'react'
import { connect } from 'react-redux'

function Dashboard(props) {

    return (
        <>
            <h1>Hello dashboard</h1>
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