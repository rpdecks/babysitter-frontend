import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Col, Form, Button, Row } from 'react-bootstrap'
import styled from 'styled-components'

const Styles = styled.div `
  .left-column {
    border: black solid 1px;
  }
  .split-input-row {
    overflow-y: scroll;
  }
  .instructions {
    // padding-bottom: 15px;
  }
  .instructions h3 {
    margin-top: 10px;
    margin-bottom: 10px;
  }
`

class CaregiverSignup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
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
            pay_rate: '',
            first_aid_cert: '',
        }
    }

    componentDidMount() {
        if (this.props.userData) {
            this.setUser(this.props.userData);
        }
    }

    setUser(user) {
        this.setState({
            first_name: user.first_name || '',
            last_name: user.last_name || '',
            address: user.address || '',
            email: user.email || '',
            password: user.password || '',
            dob: user.dob || '',
            gender: user.gender || '',
            phone: user.phone || '',
            smoker: user.smoker || '',
            has_pets: user.has_pets || '',
            bio: user.bio || '',
            pay_rate: user.pay_rate || '',
            first_aid_cert: user.first_aid_cert || '',
            image: user.image || '',
        })
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        e.target.reset();
        if (this.props.userData) {
            this.editUser(this.props.userData.id)
        } else this.signup()
    }

    editUser = (id) => {
        const userObj =  {
            caregiver: this.state
        }

        const fetchObj = {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(userObj)
        }

        fetch(`http://localhost:3000/api/v1/caregivers/${id}`, fetchObj)
        .then(res => res.json())
        .then(userData => {
            if (userData.id) {
                this.props.storeUserData(userData)
                this.props.history.push('/');
            } else { alert(userData.msg) };
        })
        .catch((errors) => console.log(errors))

    }

    signup = () => {
        const userObj =  {
            caregiver: this.state
        }

        const fetchObj = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(userObj)
        }

        fetch('http://localhost:3000/api/v1/caregivers', fetchObj)
        .then(res => res.json())
        .then(loginData => {
            if (loginData.token) {
                localStorage.setItem('auth_token', loginData.token);
                localStorage.setItem('userType', this.props.userType);
                this.props.setLoginStatus(true)
                this.props.history.push('/');
            } else { alert(loginData.msg) };
        })
        .catch((errors) => alert(errors))
    }

    handleCancelClick = () => {
        this.props.setUserType(null) 
        this.props.setSigningUp(false)
        this.props.history.push('/')
    }

    renderInstructions = () => {
        if (this.props.userData) {
            return <>
                <h3>My Account</h3>
                <p>Edit the form below and click submit to edit your profile:</p>
            </>
        } else {
            return <>
                <h3>Create a Your Babysitting Account</h3>
                <p>Complete the form below and click submit to get started!</p>
            </>
        }
    }

    render() {
        return (
            <Styles>
                <div className="instructions">{this.renderInstructions()}</div>
                <Form onSubmit={(e) => this.handleSubmit(e)}>
                    <Row className="split-input-row">
                    <Col xs={4}>
                        <Form.Label>First name</Form.Label>
                        <Form.Control name="first_name" defaultValue={this.state.first_name} onChange={e => this.handleChange(e)}/>

                        <Form.Label>Last name</Form.Label>
                        <Form.Control name="last_name" defaultValue={this.state.last_name} onChange={e => this.handleChange(e)}/>
                        <Form.Label>Email</Form.Label>
                        <Form.Control name="email" defaultValue={this.state.email} onChange={e => this.handleChange(e)}/>

                        <Form.Label>Password</Form.Label>
                        <Form.Control name="password" defaultValue={''} onChange={e => this.handleChange(e)}/>
                    </Col>
                    <Col xs={4}>
                        <Form.Label>Phone:</Form.Label>
                        <Form.Control name="phone" defaultValue={this.state.phone} onChange={e => this.handleChange(e)}/>
                        <Form.Label>Date of birth:</Form.Label>
                        <Form.Control name="dob" defaultValue={this.state.dob} onChange={e => this.handleChange(e)}/>

                        <Form.Label>Gender</Form.Label>
                        <Form.Control name="gender" as="select" value={this.state.gender} onChange={e => this.handleChange(e)}>
                            <option>Choose...</option>
                            <option>Male</option>
                            <option>Female</option>
                        </Form.Control>
                        <Form.Label>Pay Rate ($/hour) </Form.Label>
                        <Form.Control 
                            name="pay_rate" 
                            type="number" 
                            defaultValue={this.state.pay_rate} 
                            onChange={e => this.handleChange(e)}
                        />
                    </Col>
                    <Col xs={4}>
                        <Form.Label>Additional info:</Form.Label>
                        <Form.Check name="smoker" 
                                    type="checkbox" 
                                    label="Smoker" 
                                    defaultValue={this.state.smoker} 
                                    onChange={e => this.handleChange(e)}/>
                        <Form.Check name="has_pets" 
                                    type="checkbox" 
                                    label="I have pets" 
                                    defaultValue={this.state.has_pets} 
                                    onChange={e => this.handleChange(e)}/>
                        <Form.Check name="first_aid_cert" 
                                    type="checkbox" 
                                    label="First aid certification" 
                                    defaultValue={this.state.first_aid_cert} 
                                    onChange={e => this.handleChange(e)}/>
                    </Col>
                    </Row>
                        <Form.Label>Address</Form.Label>
                        <Form.Control name="address" defaultValue={this.state.address} onChange={e => this.handleChange(e)}/>
                        <hr />
                        <Form.Label>Tell us a little about yourself...</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            rows="5"
                            name="content"
                            placeholder="Tell other users about yourself" 
                            defaultValue={this.state.bio}
                            onChange={e => this.handleChange(e)}
                        /><br />
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                    <Button variant="danger" onClick={() => this.handleCancelClick()} >
                        Cancel
                    </Button>
                </Form>
            </Styles>
        )
    }
}

const mapStateToProps = state => {
    return {
        userType: state.userReducer.userType,
        userData: state.userReducer.userData,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setUserType: (value) => dispatch({ type: 'SET_USER_TYPE', userType: value}),
        setLoginStatus: (status) => dispatch({ type: 'SET_LOGIN_STATUS', isLoggedIn: status}), 
        setSigningUp: (condition) => dispatch({ type: 'SETTING_SIGNING_UP', signingUp: condition }),
        storeUserData: (user) => dispatch ({ type: 'STORE_USER_DATA', userData: user }),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CaregiverSignup))