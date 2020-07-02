import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Table } from 'react-bootstrap'
import styled from 'styled-components'

const Styles = styled.div `
//   overflow-y: scroll;
//   max-height: 100vh;
`
class Jobs extends React.Component {

    handleClick = (jobId, props) => {
        if (props.interestedJobs.find(job => job.job_id === jobId)) {
            props.removeInterested(jobId)
        } else { props.addInterested(jobId) }
        this.saveInterestInJob(jobId)
    }

    saveInterestInJob = (jobId, props) => {

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

    interestBtn = (job_id, props) => {
        if (props.interestedJobs && props.interestedJobs.find(job => job.job_id === job_id)) {
            return <button onClick={() => this.handleClick(job_id, props)}>Remove</button> 
        } else { return <button onClick={() => this.handleClick(job_id, props)}>Interested?</button>}
    }

    sortJobs = (jobs, criteria ) => {
        let jobsToSort = [...jobs]
        jobsToSort.sort(function (a, b) {
        if (typeof(a[criteria]) !== 'number') {
            return (a[criteria]).localeCompare(b[criteria])
        } else { return a[criteria] - b[criteria] }
        })
    }

    showJob = (id) => {
        this.props.setSelectedJob(id)
        this.props.history.push('/show')
    }

    filterJobs = (jobs, filter) => {
        if (filter) {
            let filteredJobs = [...jobs]
            filteredJobs = jobs.filter(job => job.filter === filter)
            return filteredJobs
        } else return jobs
    }

    // applyCompletionFilter = (job) => {
    //     return (job.status === "complete")
    // }

    // applyNonSmokingFilter = (job) => {
    //     return (job.non_smoking == true)
    // }

    // const myfilters = [this.applyCompletionFilter, this.applyNonSmokingFilter]

    // const filteredJobs = jobs.filter(job => this.myfilters.every(f =>(job)))


    mapMyJobs = (jobs, completionFilter, nonSmokingFilter, firstAidCertFilter, petsFilter) => {
        let jobsCopy = [...jobs]
        // console.log(jobsCopy)
        // const filterAry = [completionFilter, nonSmokingFilter, firstAidCertFilter, petsFilter]
        // const filteredJobs = filterAry.forEach (filter => {
        //     if (filter)
        //     return this.filterJobs(jobsCopy)
        // })
        // console.log(filteredJobs)
        return jobsCopy.map((job, index)=> {
            return (
                <tr key={index} onClick={() => this.showJob(job.id)}>
                    <td>{index + 1}</td>
                    <td>{job.start_date_MMDDYY}</td>
                    <td>{job.start_time_HHMM}</td>
                    <td>{job.duration} hr</td>
                    <td>{job.title}</td>
                    <td>{job.location}</td>
                    <td>${job.pay_rate}/hour</td>
                    <td>{job.total_child_count}</td>
                    <td>{job.non_smoking === true ? 'Yes' : 'No'}</td>
                    <td>{job.first_aid_cert === true ? 'Yes' : 'No'}</td>
                    <td>{job.has_pets === true ? 'Yes' : 'No'}}</td>
                    <td>{this.props.userType === 'employer' ? job.status : job.caregiver_id ? job.status : this.interestBtn(job.id, this.props)}</td>
                </tr>
            )
        })
    }

    render() {
        return (
            <Styles>
                <hr />
                <h1>My Babysitting Jobs</h1> 
                {this.props.userJobs && <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>#</th>
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
                        {this.props.userJobs && this.mapMyJobs(this.props.userJobs, this.props.completionFilter, this.props.nonSmokingFilter, this.props.firstAidCertFilter, this.props.petsFilter)} 
                    </tbody>
                </Table>
                }
                {this.props.availableJobs &&
                <>
                <hr />
                <h1>Available Babysitting Jobs</h1> 
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>#</th>
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
                        {this.props.availableJobs && this.mapMyJobs(this.props.availableJobs, this.props)} 
                    </tbody>
                </Table>
                </>
                }
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