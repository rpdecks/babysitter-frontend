import React from 'react'
import { API_ROOT } from '../services/apiRoot'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { Table, Button } from 'react-bootstrap'
import styled from 'styled-components'

const Styles = styled.div `
    font-family: 'Roboto', sans-serif;
    .header-text {
        font-size: x-large;
        text-align: left;
        color: #757575;
        font-family: 'Arimo', sans-serif;
    } 
    a:link {
        color: #00BCD4;
    }
    a:visited {
        color: #757575;
    }
    table, th, td, tr {
        font-size: x-small;
        color: #212121;
    }
    table {
        border: none;
        text-align: center;
    }
    td:nth-child(1), td:nth-child(8), td:nth-child(9) {
        text-align: center;
    }
    th:nth-child(2) {
        width: 120px;
    }
    th:nth-child(4) {
        width: 140px;
    }
    th:nth-child(6) {
        width: 190px;
    }
    th:nth-child(8) {
        width: 50px;
    }
    th:nth-child(9) {
        width: 180px;
    }
    th:nth-child(10) {
        width: 120px;
    }
    th:nth-child(n+11) {
        width: 50px;
    }
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

        fetch(`${API_ROOT}/candidates`, fetchObj)
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
            return (
                <Button 
                    size="sm" 
                    onClick={() => this.saveInterestInJob(job_id)}
                    style={{ backgroundColor: "#757575", color: 'white', border: '0', width: '100%' }}
                    variant='link'
                >
                    Remove
                </Button> 
            )
        } else return (
            <Button 
                size="sm" 
                onClick={() => this.saveInterestInJob(job_id)}
                style={{ backgroundColor: "#0097A7", color: 'white', border: '0', width: '100%' }}
            >
                Interested?
            </Button>
        )
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
                <tr key={index} >
                    <td><Link to={`/jobs/${job.id}`}>Show</Link></td>
                    <td>{job.start_date_YYYYMMDD}</td>
                    <td>{job.start_time_HHMM}</td>
                    <td>{job.duration}</td>
                    <td>{job.title}</td>
                    <td>{job.job_location}</td>
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
        return (
        <>
            <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Details</th>
                            <th onClick={() => this.props.sortTable('start_time')}>Date</th>
                            <th onClick={() => this.props.sortTable('start_time')}>Start</th>
                            <th onClick={() => this.props.sortTable('length')}>Duration</th>
                            <th>Title</th>
                            <th>Location</th>
                            <th onClick={() => this.props.sortTable('pay_rate')}>Pay rate</th>
                            <th onClick={() => this.props.sortTable('total_child_count')}>Kids</th>
                            <th>Non-Smoking?</th>
                            <th>First-aid</th>
                            <th>Pets?</th>
                            <th>Interested?</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.mapMyJobs(jobs)} 
                    </tbody>
            </Table>
        </>
        )
    }

    renderHeader = () => {
        if (window.location.pathname === '/past-jobs') {
            return (
                <div className='header-text'>
                    Past Babysitting Jobs
                </div>
            )
        } else if (window.location.pathname === '/pending-jobs') {
            return (
                <div className='header-text'>
                    Pending Babysitting Jobs
                </div>
            )
        } else if (this.props.userType === 'employer') {
            return (
                <div className='header-text'>
                    My Babysitting Jobs
                </div>
            )
        } else if (this.props.userType === 'caregiver') {
            return (
                <div className='header-text'>
                    Available Babysitting Jobs
                </div>
            )
        }
    }

    renderJobs = () => {
        if (window.location.pathname === '/past-jobs') {
            let filteredJobs = this.props.userJobs.filter(job => job.status === 'complete')
            return (
                <>
                    <Table striped bordered hover size="sm">
                        <div className='table'>
                        <thead>
                            <tr>
                                <th>Details</th>
                                <th onClick={() => this.props.sortTable('start_time')}>Date</th>
                                <th onClick={() => this.props.sortTable('start_time')}>Start</th>
                                <th onClick={() => this.props.sortTable('length')}>Duration</th>
                                <th>Title</th>
                                <th>Location</th>
                                <th onClick={() => this.props.sortTable('pay_rate')}>Pay rate</th>
                                <th onClick={() => this.props.sortTable('total_child_count')}>Kids</th>
                                <th>Non-Smoking?</th>
                                <th>First-aid</th>
                                <th>Pets?</th>
                                <th onClick={() => this.props.sortTable('status')}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.userJobs && this.mapMyJobs(filteredJobs)} 
                        </tbody>
                        </div>
                    </Table>
                </>
            )
        } else if (window.location.pathname === '/pending-jobs') {
            if (this.props.userJobs) {
                let filteredJobs = this.props.userJobs.filter(job => job.status === 'incomplete')
                return (
                    <>
                        <Table striped bordered hover size="sm">
                            <div className='table'>
                            <thead>
                                <tr>
                                    <th>Details</th>
                                    <th onClick={() => this.props.sortTable('start_time')}>Date</th>
                                    <th onClick={() => this.props.sortTable('start_time')}>Start</th>
                                    <th onClick={() => this.props.sortTable('length')}>Duration</th>
                                    <th>Title</th>
                                    <th>Location</th>
                                    <th onClick={() => this.props.sortTable('pay_rate')}>Pay rate</th>
                                    <th onClick={() => this.props.sortTable('total_child_count')}>Kids</th>
                                    <th>Non-Smoking?</th>
                                    <th>First-aid</th>
                                    <th>Pets?</th>
                                    <th onClick={() => this.props.sortTable('status')}>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.userJobs && this.mapMyJobs(filteredJobs)} 
                            </tbody>
                            </div>
                        </Table>
                    </>
                )
            }
        } else if (window.location.pathname === '/jobs') {
            if (this.props.userType === 'caregiver') {
                return this.renderAvailableJobs(this.props.availableJobs)
            }
        }
    }
    
    render() {
        return (
            <Styles>
                {this.renderHeader()}
                {this.renderJobs()}
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