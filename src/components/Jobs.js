import React from 'react'
import { connect } from 'react-redux'
import { Table } from 'react-bootstrap'
import styled from 'styled-components'

const Styles = styled.div `
//   overflow-y: scroll;
//   max-height: 100vh;
`
function Jobs(props) {

    function handleClick(jobId, props) {
        if (props.interestedJobs.find(job => job.job_id === jobId)) {
            props.removeInterested(jobId)
        } else { props.addInterested(jobId) }
        saveInterestInJob(jobId)
    }

    function interestBtn(job_id, props) {
        if (props.interestedJobs && props.interestedJobs.find(job => job.job_id === job_id)) {
            return <button onClick={() => handleClick(job_id, props)}>Remove</button> 
        } else { return <button onClick={() => handleClick(job_id, props)}>Interested?</button>}
    }

    function mapMyJobs(jobs) {
        return jobs.map((job, index)=> {
            let date = new Date(job.start_time).toDateString()
            let startTime = new Date(job.start_time).toISOString().substr(11, 8)
            return (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{date}</td>
                    <td>{startTime}</td>
                    <td>{job.duration}</td>
                    <td>{job.title}</td>
                    <td>{job.location}</td>
                    <td>${job.pay_rate}/hour</td>
                    <td>{job.total_child_count}</td>
                    <td>{job.caregiver_id ? job.status : interestBtn(job.id, props)}</td>
                </tr>
            )
        })
    }

    return (
        <Styles>
            <hr />
            <h1>My Jobs</h1> 
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Date</th>
                        <th>Start time</th>
                        <th>Length</th>
                        <th>Title</th>
                        <th>Location</th>
                        <th>Pay rate</th>
                        <th>Kids #</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                {props.userJobs && mapMyJobs(props.userJobs)} 
                </tbody>
            </Table>
            <hr />
            <h1>Available Jobs</h1> 
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Date</th>
                        <th>Start time</th>
                        <th>Length</th>
                        <th>Title</th>
                        <th>Location</th>
                        <th>Pay rate</th>
                        <th>Kids #</th>
                        <th>Interested?</th>
                    </tr>
                </thead>
                {props.availableJobs && mapMyJobs(props.availableJobs)} 
            </Table>
        </Styles>
    )
}

function saveInterestInJob(jobId, props) {

    const auth_token = localStorage.getItem('auth_token')
    if (!auth_token) {
      return
    }

    const fetchObj = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Auth-Token': auth_token
        },
        body: JSON.stringify({job_id: jobId})
    }

    fetch('http://localhost:3000/api/v1/candidates', fetchObj)
    .then(res => res.json())
    .then(candidateResponse=> {
        if (candidateResponse.created) {
            props.addInterested(candidateResponse.job_id)
        } else {
            props.removeInterested(candidateResponse.job_id)
        }
    })
    .catch(errors => console.log(errors))
}

const mapStateToProps = state => {
    return {
        user: state.userReducer.user,
        userJobs: state.jobReducer.userJobs,
        interestedJobs: state.jobReducer.interestedJobs,
        availableJobs: state.jobReducer.availableJobs
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addInterested: (jobId) => dispatch({ type: 'ADD_CANDIDATE', job_id: jobId}),
        removeInterested: (jobId) => dispatch({ type: 'REMOVE_CANDIDATE', job_id: jobId}),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Jobs)