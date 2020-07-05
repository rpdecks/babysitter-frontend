import React from 'react'
import { connect } from 'react-redux'
import { Button, CardDeck, Col, Row } from 'react-bootstrap'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import UserCard from './UserCard'
import styled from 'styled-components'

const Styles = styled.div `
  .row-fluid {
    overflow: auto;
    white-space: nowrap;
  }
  .card {
    //   width: 25vw;
  }
`  

class JobShow extends React.Component {
    state = {
        editing: '',
    }

    renderEditBtn = () => {
        if (this.props.userType === 'employer') {
            return <Link to={`/jobs/${this.props.job.id}/edit`}>
                <Button variant="primary" onClick={() => this.props.history.push('/')} >
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
                        <UserCard user={candidate} key={index} userType={'caregiver'} />
                    </Col>
                )
            })
        }
    }

    render() {
        return (
            <>
            <Styles>
                <Row>
                    <CardDeck>
                        { this.renderResponses() }
                    </CardDeck>
                </Row>
            </Styles>
            <h3>{this.props.job.title}</h3>
            <hr />
            <p>{new Date(this.props.job.end_time).toDateString()}</p>
            <p><b>Duration:</b> {this.props.job.duration} hours</p>
            <p>{this.props.job.start_time_HHMM} to {this.props.job.start_time_HHMM}</p>
            <p><b>Location:</b> {this.props.job.job_location}</p>
            <p><b>Pay rate:</b> ${this.props.job.pay_rate} / hour</p>
            <hr />
            <h3>Job requirements:</h3>
            <p><b>Non-smoking?</b> {this.props.job.non_smoking === true ? 'Yes' : 'No'}</p>
            <p><b>First Aid Cert?</b> {this.props.job.first_aid_cert === true ? 'Yes' : 'No'}</p>
            <p><b>Pets involved?</b> {this.props.job.has_pets === true ? 'Yes' : 'No'}</p>
            <hr />
            <h3>Description:</h3>
            <p>{this.props.job.desc}</p>

            {this.renderEditBtn()}
            <Button variant="danger" onClick={() => this.props.history.push('/jobs')} >
                Back
            </Button>
            </>
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