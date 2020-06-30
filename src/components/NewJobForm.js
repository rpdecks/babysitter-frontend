import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Col, Form, Button } from 'react-bootstrap'

class NewJobForm extends React.Component {
    state = {
        title: '',
        status: '',
        location: '',
        start_time: '',
        end_time: '',
        desc: '',
        total_child_count: '',
        infant_count: '',
        toddler_count: '',
        school_age_count: '',
        pay_rate: '',
        smoker: '',
        first_aid_cert: '',
        has_pets: '',
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    createJob = (e) => {
        e.preventDefault();

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

        fetch('http://localhost:3000/api/v1/jobs', fetchObj)
        .then(res => res.json())
        .then(jobData => {
            console.log(jobData)
            this.props.createJob(jobData)
        })
        .catch(() => alert('Something went wrong'))
        
        e.target.reset();
    }

    render(){
        return (
        <> 
            <h1>Create a New Babysitting Job</h1>
            <p>Complete the form below and click submit to post the job to caregivers</p>
            <Form onSubmit={(e) => this.createJob(e)}>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridTitle">
                        <Form.Label>Job Title:</Form.Label>
                        <Form.Control name="title" type="text" onChange={e => this.handleChange(e)}/>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridLocation">
                        <Form.Label>Job Location:</Form.Label>
                        <Form.Control name="location" placeholder="physical address" onChange={e => this.handleChange(e)}/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridPayRate">
                        <Form.Label>Pay rate:</Form.Label>
                        <Form.Control name="pay_rate" placeholder="$ per hour" onChange={e => this.handleChange(e)}/>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridStartTime">
                        <Form.Label>Start time:</Form.Label>
                            <Form.Control name="start_time" type="date"  onChange={e => this.handleChange(e)}/>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridEndTime">
                        <Form.Label>End time:</Form.Label>
                            <Form.Control name="end_time" type="date"  onChange={e => this.handleChange(e)}/>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Label>Job description:</Form.Label>
                </Form.Row>
                <Form.Row>
                    <Form.Group controlId="formGridDesc">
                        <textarea className="form-control" name="desc" placeholder="describe the job details" onChange={e => this.handleChange(e)}/>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridTotal">
                        <Form.Label>Total # of kids:</Form.Label>
                        <Form.Control name="total_child_count" as="select" value={this.state.value} onChange={e => this.handleChange(e)}>
                            <option>Choose...</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5+</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridInfants">
                        <Form.Label># of infants:</Form.Label>
                        <Form.Control name="infant_count" as="select" value={this.state.value} onChange={e => this.handleChange(e)}>
                            <option>Choose...</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5+</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridToddlers">
                        <Form.Label># of toddlers:</Form.Label>
                        <Form.Control name="toddler_count" as="select" value={this.state.value} onChange={e => this.handleChange(e)}>
                            <option>Choose...</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5+</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridSchoolAge">
                        <Form.Label># of school age:</Form.Label>
                        <Form.Control name="school_age_count" as="select" value={this.state.value} onChange={e => this.handleChange(e)}>
                            <option>Choose...</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5+</option>
                        </Form.Control>
                    </Form.Group>
                </Form.Row>
                <br />
                <h3>Select job requirements below:</h3>
                <br />
                <Form.Group id="formGridSmoker">    
                    <Form.Check name="smoker" type="checkbox" label="Non-smoker" onChange={e => this.handleChange(e)}/>
                </Form.Group>
                <Form.Group id="formGridHasPets">
                    <Form.Check name="has_pets" type="checkbox" label="Does not have pets" onChange={e => this.handleChange(e)}/>
                </Form.Group>
                <Form.Group id="formGridHasFirstAid">
                    <Form.Check name="first_aid_cert" type="checkbox" label="First aid certified" onChange={e => this.handleChange(e)}/>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
                <Button variant="danger" href="/" >
                    Cancel
                </Button>
            </Form>
        </>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createJob: (newJob) => dispatch({ type: 'CREATE_NEW_JOB', newJob: newJob})
    }
}
export default withRouter(connect(null, mapDispatchToProps)(NewJobForm))