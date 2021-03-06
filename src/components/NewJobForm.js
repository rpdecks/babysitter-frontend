import React from 'react'
import { API_ROOT } from '../services/apiRoot'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Button, Col, Form, Row } from 'react-bootstrap'
import styled from 'styled-components'

const Styles = styled.div `
    font-family: 'Roboto', sans-serif;
    .header-text {
        font-size: x-large;
        text-align: left;
        color: #757575;
        margin-top: 0.5rem; 
    } 
    .instructions {
        margin-top: .5rem;
        font-size: small;
        text-align: left;
        color: #212121;
    }
    .job-requirements {
        margin-top: .5rem;
        margin-top: .5rem;
        font-size: large;
        text-align: left;
        color: #212121;
    }
    .form-label, form-check-label {
        font-size: small;
        color: #212121;
    }
    .form-check-label {
        font-size: small;
        color: #212121;
    }
    .input {
        font-size: small;
        color: #212121;
    }
    .btn {
        margin: 5px;
    }
    .button-row {
        float: right;
    }
`

class NewJobForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            job_location: '',
            start_date: '',
            start_time: '',
            end_date: '',
            end_time: '',
            desc: '',
            total_child_count: '',
            infant_count: '',
            toddler_count: '',
            school_age_count: '',
            pay_rate: '',
            non_smoking: '',
            first_aid_cert: '',
            has_pets: '',
        }
    }

    componentDidMount() {
        if (this.props.job) {
            this.setJob(this.props.job);
        }
    }

    setJob (job) {
        this.setState({
            title: job.title || '',
            job_location: job.job_location || '',
            start_date: job.start_date || '',
            start_time: job.start_time || '',
            end_date: job.end_date || '',
            end_time: job.end_time || '',
            desc: job.desc || '',
            total_child_count: job.total_child_count || '',
            infant_count: job.infant_count || '',
            toddler_count: job.toddler_count || '',
            school_age_count: job.school_age_count || '',
            pay_rate: job.pay_rate || '',
            non_smoking: job.non_smoking || '',
            first_aid_cert: job.first_aid_cert || '',
            has_pets: job.has_pets || '',
        })
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        e.target.reset();
        if (this.props.job) {
            this.editJob()
        } else this.createJob()
    }

    handleDelete  = () => {
        let result = window.confirm('Are you sure you want to delete this job?')
        if (result) {
            this.deleteJob(this.props.job.id)
        }
    }

    createJob = () => {

        const auth_token = localStorage.getItem('auth_token');
        const jobObj =  {
            job: this.state
        }
        if (!auth_token) {
        return;
        }

        const fetchObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Auth-Token': auth_token
            },
            body: JSON.stringify(jobObj)
        }

        fetch(`${API_ROOT}/jobs`, fetchObj)
        .then(res => res.json())
        .then(jobData => {
            this.props.createJob(jobData)
        })
        .catch(() => alert('Something went wrong'))
    }

    editJob = () => {

        const auth_token = localStorage.getItem('auth_token');
        const jobObj =  {
            job: this.state
        }
        if (!auth_token) {
        return;
        }

        const fetchObj = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Auth-Token': auth_token
            },
            body: JSON.stringify(jobObj)
        }

        fetch(`${API_ROOT}/jobs/${this.props.job.id}`, fetchObj)
        .then(res => res.json())
        .then(jobData => {
            this.props.editJob(jobData)
        })
        .catch(() => alert('Something went wrong'))
    }

    deleteJob = (id) => {

        const auth_token = localStorage.getItem('auth_token');
        if (!auth_token) {
        return;
        }

        const fetchObj = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Auth-Token': auth_token
            },
        }

        fetch(`${API_ROOT}/jobs/${id}`, fetchObj)
        .then(res => res.json())
        .then(jobData => {
            if (jobData) {
                this.props.history.push('/')
                this.props.deleteJob(id)
            } else {
                alert(jobData.msg);
            }
        })
        .catch(() => alert('Something went wrong'))
        
    }

    renderInstructions = () => {
        if (this.props.job) {
            return <>
                <div className='header-text'>My Account</div>
                <div className='instructions'>Edit the form below and click submit to edit your profile:</div>
                <hr />
            </>
        } else {
            return <>
                <div className='header-text'>My Account</div>
                <div className='instructions'>Edit the form below and click submit to edit your profile:</div>
                <hr />
            </>
        }
    }

    render(){
        return (
            <Styles>
                {this.renderInstructions()}
                <Form onSubmit={this.handleSubmit}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridTitle">
                            <Form.Label>Job Title:</Form.Label>
                            <Form.Control name="title" 
                                type="text" 
                                defaultValue={this.state.title}
                                onChange={e => this.handleChange(e)}/>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridLocation">
                            <Form.Label>Job Location:</Form.Label>
                            <Form.Control name="job_location" 
                                placeholder="physical address" 
                                defaultValue={this.state.job_location} 
                                onChange={e => this.handleChange(e)}/>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridPayRate">
                            <Form.Label>Pay rate:</Form.Label>
                            <Form.Control name="pay_rate" 
                                placeholder="$ per hour" 
                                defaultValue={this.state.pay_rate} 
                                onChange={e => this.handleChange(e)}/>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridStartTime">
                            <Form.Label>Start date:</Form.Label>
                                <Form.Control name="start_date" 
                                    type="date" 
                                    defaultValue={this.state.start_date_YYYYMMDD} 
                                    onChange={e => this.handleChange(e)}/>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridStartTime">
                            <Form.Label>Start time:</Form.Label>
                                <Form.Control name="start_time" 
                                    type="time" 
                                    defaultValue={this.state.start_time_HHMM} 
                                    onChange={e => this.handleChange(e)}/>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridEndTime">
                            <Form.Label>End date:</Form.Label>
                                <Form.Control name="end_date" 
                                    type="date" 
                                    defaultValue={this.state.end_date_YYYYMMDD} 
                                    onChange={e => this.handleChange(e)}/>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridEndTime">
                            <Form.Label>End time:</Form.Label>
                                <Form.Control name="end_time" 
                                    type="time" 
                                    defaultValue={this.state.end_time_HHMM} 
                                    onChange={e => this.handleChange(e)}/>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Label>Job description:</Form.Label>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group controlId="formGridDesc">
                            <textarea className="form-control" 
                                name="desc" 
                                placeholder="describe the job details" 
                                defaultValue={this.state.desc} 
                                onChange={e => this.handleChange(e)}/>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridTotal">
                            <Form.Label>Total # of kids:</Form.Label>
                            <Form.Control name="total_child_count" 
                                as="select" 
                                value={this.state.total_child_count} 
                                onChange={e => this.handleChange(e)}>
                                <option>Choose...</option>
                                <option>0</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5+</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridInfants">
                            <Form.Label># of infants:</Form.Label>
                            <Form.Control name="infant_count" 
                                as="select" 
                                value={this.state.infant_count} 
                                onChange={e => this.handleChange(e)}>
                                <option>Choose...</option>
                                <option>0</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5+</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridToddlers">
                            <Form.Label># of toddlers:</Form.Label>
                            <Form.Control name="toddler_count" 
                                as="select" 
                                value={this.state.toddler_count} 
                                onChange={e => this.handleChange(e)}>
                                <option>Choose...</option>
                                <option>0</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5+</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formGridSchoolAge">
                            <Form.Label># of school age:</Form.Label>
                            <Form.Control name="school_age_count" 
                                as="select" 
                                value={this.state.school_age_count} 
                                onChange={e => this.handleChange(e)}>
                                <option>Choose...</option>
                                <option>0</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5+</option>
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>
                    <div className="job-requirements">Select job requirements below:</div>
                    <Form.Group id="formGridSmoker">    
                        <Form.Check name="non_smoking" 
                            type="checkbox" 
                            label="Non-smoking" 
                            defaultValue={this.state.non_smoking} 
                            onChange={e => this.handleChange(e)}/>
                    </Form.Group>
                    <Form.Group id="formGridHasPets">
                        <Form.Check name="has_pets" 
                            type="checkbox" 
                            label="Pets involved" 
                            defaultValue={this.state.has_pets} 
                            onChange={e => this.handleChange(e)}/>
                    </Form.Group>
                    <Form.Group id="formGridHasFirstAid">
                        <Form.Check name="first_aid_cert" 
                            type="checkbox" 
                            label="First aid certified" 
                            defaultValue={this.state.first_aid_cert} 
                            onChange={e => this.handleChange(e)}/>
                    </Form.Group>

                    <Row className='button-row'>
                        <Button type="submit" style={{ background: '#00BCD4', border: '0' }}>
                            Submit
                        </Button>
                        {this.props.job ? 
                        <Button variant="danger" onClick={this.handleDelete}>
                            Delete
                        </Button>
                        :
                        null }
                        <Button style={{ background: '#0097A7', border: '0' }} href="/" >
                            Cancel
                        </Button>
                    </Row>
                </Form>
            </Styles>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        userJobs: state.jobReducer.userJobs,
        availableJobs: state.jobReducer.availableJobs,
        job: props.job,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createJob: (newJob) => dispatch({ type: 'CREATE_NEW_JOB', newJob: newJob}),
        editJob: (editedJob) => dispatch({ type: 'EDIT_JOB', editedJob: editedJob}),
        deleteJob: (jobId) => dispatch({ type: 'DELETE_JOB', deleteJob: jobId})
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewJobForm))
