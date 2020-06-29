import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Col, Form, Button } from 'react-bootstrap'

class EmployerSignup extends React.Component {
    state = {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        address: '',
        dob: '',
        gender: '',
        phone: '',
        smoker: '',
        has_pets: '',
        bio: '',
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    signup = (e) => {
        e.preventDefault();

        const userObj =  {
            employer: this.state
        }

        const fetchObj = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(userObj)
        }

        fetch('http://localhost:3000/api/v1/employers', fetchObj)
        .then(res => res.json())
        .then(loginData => {
            if (loginData.token) {
                localStorage.setItem('auth_token', loginData.token);
                localStorage.setItem('userType', this.props.userType);
                this.props.setLoginStatus(true)
                this.props.history.push('/');
            }
            else
            alert(loginData.message);
        })
        .catch(() => alert('Something went wrong'))
        
        e.target.reset();
    }

    handleCancelClick = () => {
        this.props.setUserType(null) 
        this.props.setSigningUp(false)
        this.props.history.push('/')
    }

    render() {
        return (
            <> 
                <h1>Welcome to Babysiters</h1>
                <p>Please submit the form below to create your <b>employer</b> account.</p>
                <Form onSubmit={(e) => this.signup(e)}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridFirstName">
                            <Form.Label>First name</Form.Label>
                            <Form.Control name="first_name" type="first_name" placeholder="First name" onChange={e => this.handleChange(e)}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridLasttName">
                            <Form.Label>Last name</Form.Label>
                            <Form.Control name="last_name" type="last_name" placeholder="Last name" onChange={e => this.handleChange(e)}/>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control name="email" type="email" placeholder="Enter email" onChange={e => this.handleChange(e)}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control name="password" type="password" placeholder="Password" onChange={e => this.handleChange(e)}/>
                        </Form.Group>
                    </Form.Row>
                        <Form.Group controlId="formGridAddress">
                            <Form.Label>Address</Form.Label>
                            <Form.Control name="address" placeholder="1234 Main St" onChange={e => this.handleChange(e)}/>
                        </Form.Group>
                    <Form.Row>
                        <Form.Group controlId="formGridPhone">
                            <Form.Label>Phone:</Form.Label>
                            <Form.Control name="phone" placeholder="Phone number" onChange={e => this.handleChange(e)}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridDob">
                            <Form.Label>Date of birth:</Form.Label>
                                <Form.Control name="dob" type="date" label="Date of birth" onChange={e => this.handleChange(e)}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridGender">
                            <Form.Label>Gender</Form.Label>
                            <Form.Control name="gender" as="select" value={this.state.value} onChange={e => this.handleChange(e)}>
                                <option>Choose...</option>
                                <option>Male</option>
                                <option>Female</option>
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Label>Bio:</Form.Label>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group controlId="formGridBio">
                            <textarea className="form-control" name="bio" placeholder="Tell other users about yourself" onChange={e => this.handleChange(e)}/>
                        </Form.Group>
                    </Form.Row>

                    <Form.Group id="formGridSmoker">    
                        <Form.Check name="smoker" type="checkbox" label="Smoker" onChange={e => this.handleChange(e)}/>
                    </Form.Group>
                    <Form.Group id="formGridHasPets">
                        <Form.Check name="has_pets" type="checkbox" label="I have pets" onChange={e => this.handleChange(e)}/>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                    <Button variant="danger" onClick={() => this.handleCancelClick()} >
                        Cancel
                    </Button>
                </Form>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        userType: state.userReducer.userType
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setUserType: (value) => dispatch({ type: 'SET_USER_TYPE', userType: value}),
        setLoginStatus: (status) => dispatch({ type: 'SET_LOGIN_STATUS', isLoggedIn: status}),
        setSigningUp: (condition) => dispatch({ type: 'SETTING_SIGNING_UP', signingUp: condition })
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EmployerSignup))