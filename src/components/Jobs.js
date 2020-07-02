import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { Table, Button } from 'react-bootstrap'
import styled from 'styled-components'

const Styles = styled.div `
//   overflow-y: scroll;
//   max-height: 100vh;
`
class Jobs extends React.Component {

    saveInterestInJob = (jobId) => {

        const auth_token = localStorage.getItem('auth_token')
        if (!auth_token) {
        return
        }

        const candidateObj = {
            candidate: {
                job_id: jobId
            }
        }

        const fetchObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Auth-Token': auth_token
            },
            body: JSON.stringify(candidateObj)
        }

        fetch('http://localhost:3000/api/v1/candidates', fetchObj)
        .then(res => res.json())
        .then(candidateResponse => {
            if (candidateResponse.created) {
                console.log('interest saved')   
                return this.props.addInterested(candidateResponse.job_id)
            } else {
                console.log('interest saved')   
                return this.props.removeInterested(candidateResponse.job_id)
            }
        })
        .catch(errors => console.log(errors))
    }

    interestBtn = (job_id) => {
        if (this.props.interestedJobs && this.props.interestedJobs.find(job => job.job_id === job_id)) {
            return <Button variant='danger' onClick={() => this.saveInterestInJob(job_id)}>Remove</Button> 
            } else return <Button onClick={() => this.saveInterestInJob(job_id)}>Interested?</Button>
    }

    showJob = (job) => {
        this.props.setSelectedJob(job)
        localStorage.setItem('selectedJobId', job.id)
        this.props.history.push(`/jobs/${job.id}`)
    }

    sortJobs = (jobs, criteria ) => {
        let jobsToSort = [...jobs]
        jobsToSort.sort(function (a, b) {
        if (typeof(a[criteria]) !== 'number') {
            return (a[criteria]).localeCompare(b[criteria])
        } else { return a[criteria] - b[criteria] }
        })
    }

    // Filters based on job properties
    applyCompletionFilter = (job) => {
        if (!this.props.completionFilter) return true 
        else if (this.props.completionFilter === 'complete') return (job.status === 'complete')
        else if (this.props.completionFilter === 'incomplete') return (job.status === 'incomplete')
    }
    applyNonSmokingFilter = (job) => {
        if (this.props.nonSmokingFilter === true) return (job.non_smoking === true)
        else return true
    }
    applyPetsFilter = (job) => {
        if (this.props.petsFilter === true) return (job.has_pets === true)
        else return true
    }
    applyFirstAidCertFilter = (job) => {
        if (this.props.firstAidCertFilter === true) return (job.first_aid_cert === true)
        else return true
    }

    mapMyJobs = (jobs) => {
        let jobsCopy = [...jobs]
        const myFilters = [this.applyCompletionFilter, this.applyNonSmokingFilter, this.applyPetsFilter, this.applyFirstAidCertFilter]
        const filteredJobs = jobsCopy.filter(job => myFilters.every(f => f(job)))
        return filteredJobs.map((job, index)=> {
            return (
                <tr key={index}>
                    {/* <td><Button variant="secondary" size='sm' onClick={() => this.showJob(job)}>Link</Button></td> */}
                    <td><Link to={`/jobs/${job.id}`}>Details</Link></td>
                    <td>{job.start_date_MMDDYY}</td>
                    <td>{job.start_time_HHMM}</td>
                    <td>{job.duration} hr</td>
                    <td>{job.title}</td>
                    <td>{job.location}</td>
                    <td>${job.pay_rate}/hour</td>
                    <td>{job.total_child_count}</td>
                    <td>{job.non_smoking === true ? 'Yes' : 'No'}</td>
                    <td>{job.first_aid_cert === true ? 'Yes' : 'No'}</td>
                    <td>{job.has_pets === true ? 'Yes' : 'No'}</td>
                    <td>{this.props.userType === 'employer' ? job.status : job.caregiver_id ? job.status : this.interestBtn(job.id)}</td>
                </tr>
            )
        })
    }

    renderAvailableJobs = (jobs) => {
       if (this.props.userType === 'caregiver' && this.props.availableJobs) {
        return <>
            <hr />
            <h1>Available Babysitting Jobs</h1> 
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Details</th>
                        <th onClick={() => this.props.sortTable('start_time')}>Date</th>
                        <th onClick={() => this.props.sortTable('start_time')}>Start time</th>
                        <th onClick={() => this.props.sortTable('length')}>Duration</th>
                        <th>Title</th>
                        <th>Location</th>
                        <th onClick={() => this.props.sortTable('pay_rate')}>Pay rate</th>
                        <th onClick={() => this.props.sortTable('total_child_count')}>Kids</th>
                        <th>Non-Smoking?</th>
                        <th>First-aid cert?</th>
                        <th>Pets?</th>
                        <th>Interested?</th>
                    </tr>
                </thead>
                <tbody>
                    {this.mapMyJobs(jobs)} 
                </tbody>
            </Table>
        </>
       } 
    }
    
    render() {
        return (
            <Styles>
                <hr />
                <h1>My Babysitting Jobs</h1> 
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Details</th>
                            <th onClick={() => this.props.sortTable('start_time')}>Date</th>
                            <th onClick={() => this.props.sortTable('start_time')}>Start time</th>
                            <th onClick={() => this.props.sortTable('length')}>Duration</th>
                            <th>Title</th>
                            <th>Location</th>
                            <th onClick={() => this.props.sortTable('pay_rate')}>Pay rate</th>
                            <th onClick={() => this.props.sortTable('total_child_count')}>Kids</th>
                            <th>Non-Smoking?</th>
                            <th>First-aid cert?</th>
                            <th>Pets?</th>
                            <th onClick={() => this.props.sortTable('status')}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.userJobs && this.mapMyJobs(this.props.userJobs)} 
                    </tbody>
                </Table>
                {this.props.availableJobs && this.renderAvailableJobs(this.props.availableJobs)}
            </Styles>
        )
    }
}


const mapStateToProps = state => {
    return {
        userType: state.userReducer.userType,
        userJobs: state.jobReducer.userJobs,
        interestedJobs: state.jobReducer.interestedJobs,
        availableJobs: state.jobReducer.availableJobs,
        completionFilter: state.jobReducer.completionFilter,
        nonSmokingFilter:  state.jobReducer.nonSmokingFilter, 
        firstAidCertFilter:  state.jobReducer.firstAidCertFilter, 
        petsFilter: state.jobReducer.petsFilter,
        sortBy: state.jobReducer.sortBy,
        selectedJob: state.jobReducer.selectedJob,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addInterested: (jobId) => dispatch({ type: 'ADD_CANDIDATE', job_id: jobId}),
        removeInterested: (jobId) => dispatch({ type: 'REMOVE_CANDIDATE', job_id: jobId}),
        sortTable: (criteria) => dispatch({ type: 'SORT_BY', sortBy: criteria }),
        switchOrder: (criteria) => dispatch({ type: 'SWITCH_ORDER', ascending: criteria }),
        setSelectedJob: (job) => dispatch({ type: 'SET_SELECTED_JOB', selectedJob: job }),
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Jobs))