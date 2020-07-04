import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom'

class LoginForm extends React.Component {
  state = {
    email: '',
    password: ''
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleLogin = token => {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('userType', this.props.userType);
    this.props.setLoginStatus(true)
    this.fetchData(this.props.userType)
    this.props.history.push('/')
  }

  fetchData = (userType) => {
    const auth_token = localStorage.getItem('auth_token')
    const fetchObj = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Auth-Token': auth_token,
      }
    }
    fetch('http://localhost:3000/api/v1/app_status', fetchObj)
      .then(res => res.json())
      .then(appData => {
        this.props.storeUserJobs(appData.jobs)
        this.props.storeUserData(appData.user)
        if (userType === 'employer') {
          this.props.storeUserFavorites(appData.employer_favorites)
          this.props.storeReviews(appData.caregiver_reviews)
          this.props.storeCaregivers(appData.caregivers)
        } else if (userType === 'caregiver') {
          this.props.storeUserFavorites(appData.caregiver_favorites)
          this.props.storeReviews(appData.employer_reviews)
          this.props.storeEmployers(appData.employers)
          this.props.storeAvailableJobs(appData.available_jobs)
          this.props.storeInterestedJobs(appData.interested_jobs)
        } else { console.log('No userType specific appData stored') }
      })
      .catch(error => console.log(error))
  }

  login = e => {
    e.preventDefault();

    const userObj = {
      [this.props.userType]: {
        email: this.state.email,
        password: this.state.password
      }
    }

    const fetchObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userObj)
    }

    if (this.props.userType === 'employer') {
      fetch('http://localhost:3000/api/v1/employers/login', fetchObj)
        .then(res => res.json())
        .then(loginData => {
          if (loginData.token) {
            this.handleLogin(loginData.token)
            this.props.history.push('/jobs')
          }
          else
            alert(loginData.message);
        })
        .catch(() => alert('Something went wrong'))
    } else if (this.props.userType === 'caregiver') {
      fetch('http://localhost:3000/api/v1/caregivers/login', fetchObj)
        .then(res => res.json())
        .then(loginData => {
          if (loginData.token) {
            this.handleLogin(loginData.token)
          }
          else
            alert(loginData.message);
        })
        .catch(() => alert('Something went wrong'))
    }
    e.target.reset()
  }

  render() {
    return (
      <>
        <h1>Welcome to Babysitters</h1>
        <p>Please login below as <b>{this.props.userType}</b></p>
        <form onSubmit={(e) => this.login(e)}>
          <label>Email:</label><br />
          <input name="email" label="Email" onChange={e => this.handleChange(e)} /><br />
          <label>Password:</label><br />
          <input name="password" type="password" label="Password" onChange={e => this.handleChange(e)} /><br />
          <input type="submit" />
          <input type="button" value="Back" onClick={() => this.props.setUserType(null)} />
        </form>
        <Link to="/signup" onClick={() => this.props.setSigningUp(true)}>Create an account</Link>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.userReducer.user,
    userType: state.userReducer.userType,
    isLoggedIn: state.userReducer.isLoggedIn,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    storeUserData: (userData) => dispatch({type: 'STORE_USER_DATA', userData: userData}),
    setUserType: (userType) => dispatch({ type: 'SET_USER_TYPE', userType: userType }),
    setSigningUp: (condition) => dispatch({ type: 'SETTING_SIGNING_UP', signingUp: condition }),
    setLoginStatus: (status) => dispatch({type: 'SET_LOGIN_STATUS', isLoggedIn: status}),
    storeUserJobs: (userJobs) => dispatch({type: 'STORE_USER_JOBS', userJobs: userJobs}),
    storeAvailableJobs: (availableJobs) => dispatch({type: 'STORE_AVAILABLE_JOBS', availableJobs: availableJobs}),
    storeCaregivers: (caregivers) => dispatch({type: 'STORE_CAREGIVERS', caregivers: caregivers}),
    storeEmployers: (employers) => dispatch({type: 'STORE_EMPLOYERS', employers: employers}),
    storeInterestedJobs: (jobs) => dispatch({type: 'STORE_INTERESTED_JOBS', interestedJobs: jobs}),
    storeUserFavorites: (favorites) => dispatch({type: 'STORE_USER_FAVORITES', userFavorites: favorites}),
    storeReviews: (reviews) => dispatch ({ type: 'STORE_REVIEWS', reviews: reviews}),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm));