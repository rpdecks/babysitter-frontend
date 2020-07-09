import React from 'react'
import { connect } from 'react-redux'
import { Button, CardDeck, Col, Row, Container } from 'react-bootstrap'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import UserCard from './UserCard'
import styled from 'styled-components'

const Styles = styled.div `
    font-family: 'Roboto', sans-serif;

    .header-text {
        font-size: x-large;
        text-align: left;
        color: #757575;
        font-family: 'Roboto', sans-serif;
    } 
    .award-success {
        font-size: large;
        text-align: center;
        color: green;
    }
    .award-failure {
        font-size: xx-large;
        text-align: center;
        color: red;
    }
    .sitter-instruction {
        font-size: large;
        text-align: center;
        color: red;
    }
    .job-title {
        font-size: x-large;
        text-align: center;
        color: #757575;
        font-family: 'Roboto', sans-serif;
        margin-left: 1rem;
        margin-bottom: 0.5rem;
    } 
    .job-detail-items {
        font-size: small;
        font-weight: bold;
        text-align: right;
        color: #757575;
        font-family: 'Roboto', sans-serif;
        margin-left: 10px;
    }
    .job-detail-data {
        font-size: small;
        text-align: left;
        color: #757575;
        font-family: 'Roboto', sans-serif;
    }
    .btn {
        margin: 5px;
    }
    .button-row {
        float: right;
    }
    .desc-header {
        font-size: x-large;
        font-weight: bold;
        text-align: left;
        color: #757575;
        font-family: 'Roboto', sans-serif;
    } 
    .desc-text {
        font-size: small;
        text-align: justify;
        color: #212121;
        font-family: 'Roboto', sans-serif;
    } 
`  

class JobShow extends React.Component {

    renderEditBtn = () => {
        if (this.props.userType === 'employer') {
            return <Link to={`/jobs/${this.props.job.id}/edit`}>
                <Button style={{ background: '#00BCD4', border: '0' }} onClick={() => this.props.history.push('/')} >
                    Edit
                </Button>
            </Link>
        }
    }

    renderResponses = () => {
        if (this.props.job.candidates && this.props.job.candidates.length > 0) {
            return this.props.job.candidates.map((cand, index) => {
                const candidate = this.props.caregivers.find(c => c.id === cand.caregiver_id)
                return (
                    <Col xs={3} key={index} >
                        <UserCard 
                            user={candidate} 
                            className='card'
                            key={index} 
                            userType={'caregiver'}
                            />
                    </Col>
                )
            })
        }
    }

    renderJobCaregiverInfo() {
        const caregiver = this.props.caregivers.find(c => c.id === this.props.job.caregiver_id)
        if (this.props.job.caregiver_id) {
            return (
                <>
                    <div className="award-success">Job awarded!</div>
                    Caregiver name:
                        <Link to={`/caregivers/${caregiver.id}`}>
                            {caregiver.first_name}
                        </Link>
                </>
            )
        } else {
            return (
                <>
                    <div className="award-failure">
                        Job not yet awarded!<br /> 
                        <div className="sitter-instruction">
                            Select your babysitter above
                        </div>
                    </div>
                </>
            )
        }
    }

    render() {
        return (
            <Styles>
                {this.props.job.candidates && this.props.job.candidates.length > 0 ?
                    <Styles>
                        <div className="header-text">Review your applicants and award your job!</div>
                        <Row >
                            <CardDeck >
                                { this.renderResponses() }
                            </CardDeck>
                        </Row>
                    </Styles>
                    :
                    null
                }
            <hr />
            <Row>
                { this.props.userType === 'employer' ? this.renderJobCaregiverInfo() : null }
            </Row>
            <hr />
            <Row>
                <Col xs={12}>
                    <Row>
                        <div className="job-title"><b>Job title:</b> {this.props.job.title}</div>
                    </Row>
                    <Row>
                        <Col xs={2}>
                            <div className="job-detail-items">
                                Status:<br />
                                When:<br />
                                Duration:<br />
                                Start/End Time:<br />
                                Location:<br />
                                Pay rate:<br />
                            </div>
                        </Col>
                        <Col xs={6}>
                            <div className="job-detail-data">
                                {this.props.job.status}<br />
                                {new Date(this.props.job.end_time).toDateString()}<br />
                                {this.props.job.duration}<br />
                                {this.props.job.start_time_HHMM} to {this.props.job.start_time_HHMM}<br />
                                {this.props.job.job_location}<br />
                                {this.props.job.pay_rate} / hour<br />
                            </div>
                        </Col>
                        <Col xs={3}>
                            <div className="job-detail-items">
                                <div className="header-text">Job requirements:</div>
                                Non-smoking?<br />
                                First-aid cert?<br />
                                Pets involved?<br />
                            </div>
                        </Col>
                        {/* <b>Non-smoking?</b> {this.props.job.non_smoking === true ? 'Yes' : 'No'}
                        <b>First Aid Cert?</b> {this.props.job.first_aid_cert === true ? 'Yes' : 'No'}
                        <b>Pets involved?</b> {this.props.job.has_pets === true ? 'Yes' : 'No'} */}
                    </Row>
                </Col>
            </Row>
            <hr />
            <div className="desc-header">Description:</div>
            <div>className="desc-text">{this.props.job.desc}</div>

            <Row className='button-row'>
                {this.renderEditBtn()}
                <Button style={{ background: '#0097A7', border: '0' }} onClick={() => this.props.history.push('/jobs')} >
                    Back
                </Button>
            </Row>
        </Styles>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        userType: state.userReducer.userType,
        userJobs: state.jobReducer.userJobs,
        availableJobs: state.jobReducer.availableJobs,
        caregivers: state.userReducer.caregivers,
        job: props.job,
    }
}

export default withRouter(connect(mapStateToProps)(JobShow))