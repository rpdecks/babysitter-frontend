import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import { withRouter } from 'react-router'
import { render } from 'react-dom'

class JobShow extends React.Component {

    handleClick = () => {
        debugger
        localStorage.removeItem('selectedJobId')
    }

    render() {
        return (
            <>
                <h3>Job title:</h3>
                <p>{this.props.job.title}</p>

                <Button variant="danger" onClick={() => this.props.history.push('/')} >
                    Back
                </Button>
            </>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        userJobs: state.jobReducer.userJobs,
        availableJobs: state.jobReducer.availableJobs,
        jobId: props.match.params,
        job: props.job,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        unselectJob: (value) => dispatch({ type: 'SET_SELECTED_JOB', selectedJob: value})
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(JobShow))