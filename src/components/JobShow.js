import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import { withRouter } from 'react-router'

function JobShow(props) {

    function handleClick() {
        props.unselectJob(null)
        props.history.push('/')
    }

    return (
        <>
            <h1>Job title: {props.selectedJob.title}</h1>

            <Button variant="danger" onClick={() => handleClick()} >
                Back
            </Button>
        </>
    )
}

const mapStateToProps = state => {
    return {
        selectedJob: state.jobReducer.selectedJob
    }
}

const mapDispatchToProps = dispatch => {
    return {
        unselectJob: (value) => dispatch({ type: 'SET_SELECTED_JOB', selectedJob: value})
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(JobShow))