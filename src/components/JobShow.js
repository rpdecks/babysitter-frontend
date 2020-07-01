import React from 'react'
import { connect } from 'react-redux'

function JobShow(props) {
    // debugger
    return (
        <>
            <h1>Job title: {props.selectedJob.title}</h1>
            
        </>
    )
}

const mapStateToProps = state => {
    return {
        selectedJob: state.jobReducer.selectedJob
    }
}

export default connect(mapStateToProps)(JobShow)