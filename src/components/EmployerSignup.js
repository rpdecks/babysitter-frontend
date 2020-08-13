import React from 'react'
import { API_ROOT } from '../services/apiRoot'
import { fetchData } from '../services/fetches'
// import { fetchData } from '../actions/fetches'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Col, Form, Button, Row } from 'react-bootstrap'
import styled from 'styled-components'

const Styles = styled.div `
    font-family: 'Roboto', sans-serif;
    .header-text {
        font-size: x-large;
        text-align: left;
        color: #757575;
        margin-top: 0.5rem; 
    } 
    .split-input-row {
        overflow-y: scroll;
    }
    .instructions {
        margin-top: .5rem;
        font-size: small;
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

class EmployerSignup extends React.Component {
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
            image: user.image || '',
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        e.target.reset();
        if (this.props.userData) {
            this.editUser(this.props.userData.id)
            this.props.history.push('/account')
        } else {
            this.signup()
        }
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    editUser = (id) => {
        const userObj =  {
            employer: this.state
        }

        const fetchObj = {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(userObj)
        }

        fetch(`${API_ROOT}/employers/${id}`, fetchObj)
        .then(res => res.json())
        .then(userData => {
            if (userData.id) {
                this.props.storeUserData(userData)
                this.props.history.push('/account');
            } else { alert(userData.msg) };
        })
        .catch((errors) => console.log(errors))
    }

    signup = (e) => {

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

        fetch(`${API_ROOT}/employers`, fetchObj)
        .then(res => res.json())
        .then(loginData => {
            if (loginData.token) {
                localStorage.setItem('auth_token', loginData.token);
                localStorage.setItem('userType', this.props.userType);
                this.props.setLoginStatus(true);
                fetchData(this.props.userType, this.props);
                // fetchData(this.props.userType);
                this.props.history.push('/browse')
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
                <div className='header-text'>My Account</div>
                <div className='instructions'>Edit the form below and click submit to edit your profile:</div>
                <hr />
            </>
        } else {
            return <>
                <div className='header-text'>Create your Babysitter account</div>
                <div className='instructions'>Complete the form below and click submit to get started!</div>
                <hr />
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
                        { this.props.userType === 'caregiver' ? 
                            <>
                                <Form.Label>Pay Rate ($/hour) </Form.Label>
                                <Form.Control 
                                    name="pay_rate" 
                                    type="number" 
                                    defaultValue={this.state.pay_rate} 
                                    onChange={e => this.handleChange(e)}
                                />
                            </>
                            : 
                            null }
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
                        { this.props.userType === 'caregiver' ? 
                            <Form.Check name="first_aid_cert" 
                                        type="checkbox" 
                                        label="First aid certification" 
                                        defaultValue={this.state.first_aid_cert} 
                                        onChange={e => this.handleChange(e)}
                            />
                            : null }
                    </Col>
                    </Row>
                        <Form.Label>Address</Form.Label>
                        <Form.Control name="address" defaultValue={this.state.address} onChange={e => this.handleChange(e)}/>
                        <hr />
                        <Form.Label>Tell us a little about yourself...</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            rows="5"
                            name="bio"
                            placeholder="Tell other users about yourself" 
                            defaultValue={this.state.bio}
                            onChange={e => this.handleChange(e)}
                        /><br />
                    <Row className='button-row'>
                        <Button type="submit" style={{ background: '#00BCD4', border: '0' }}>
                            Submit
                        </Button>
                        <Button style={{ background: '#0097A7', border: '0' }} onClick={() => this.handleCancelClick()} >
                            Cancel
                        </Button>
                    </Row>
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
        storeUserJobs: (userJobs) => dispatch({type: 'STORE_USER_JOBS', userJobs: userJobs}),
        storeAvailableJobs: (availableJobs) => dispatch({type: 'STORE_AVAILABLE_JOBS', availableJobs: availableJobs}),
        storeCaregivers: (caregivers) => dispatch({type: 'STORE_CAREGIVERS', caregivers: caregivers}),
        storeEmployers: (employers) => dispatch({type: 'STORE_EMPLOYERS', employers: employers}),
        storeInterestedJobs: (jobs) => dispatch({type: 'STORE_INTERESTED_JOBS', interestedJobs: jobs}),
        storeUserFavorites: (favorites) => dispatch({type: 'STORE_USER_FAVORITES', userFavorites: favorites}),
        storeAuthoredReviews: (reviews) => dispatch ({ type: 'STORE_REVIEWS', authoredReviews: reviews}),
        storeReviewsAboutMe: (reviews) => dispatch ({ type: 'STORE_REVIEWS_ABOUT_ME', reviewsAboutMe: reviews}),
        hydrateComplete: () => dispatch ({ type: 'HYDRATE_COMPLETE'}),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EmployerSignup))
