import React from 'react'
import { Button } from 'react-bootstrap'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

function UserIndex(props) {

    return (
        <>
            <h1>User Index Page</h1>
            <Button variant="danger" onClick={() => props.setSelectedUser()} >
                Back
            </Button>
        </>
    )   
}

const mapDispatchToProps = dispatch => {
    return {
        setSelectedUser: (choice) => dispatch({ type: 'SET_SELECTED_USER', selectedUser: choice}),
    }
}

export default withRouter(connect(null, mapDispatchToProps)(UserIndex))