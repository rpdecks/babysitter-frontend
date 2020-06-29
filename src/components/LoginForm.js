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
    this.getUserData()
  }

  getUserData = () => {
    const auth_token = localStorage.getItem('auth_token');
    const routeForUserType = () => {
      if (this.props.userType === 'employer') { return 'employers'}
      else if (this.props.userType === 'caregiver') { return 'caregivers'}
    }
    
    if (!auth_token) {
      return;
    }

    const fetchObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Auth-Token': auth_token
      }
    }
    fetch(`http://localhost:3000/api/v1/${routeForUserType()}/get_info`, fetchObj)
      .then(res => res.json())
      .then(userData => this.props.storeUser(userData))
  }

  login = e => {
    e.preventDefault();

    const userObj =  {
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
          this.props.history.push('/')
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
          this.props.history.push('/');
        }
        else
          alert(loginData.message);
      })
      .catch(() => alert('Something went wrong'))
    }
    e.target.reset();
  }

  render() {
    return (
      <>
        <h1>Welcome to Babysiters</h1>
        <p>Please login below as <b>{this.props.userType}</b>.</p>
        <form onSubmit={(e) => this.login(e)}>
          <label>Email:</label><br />
          <input name="email" label="Email" onChange={e => this.handleChange(e)}/><br />
          <label>Password:</label><br />
          <input name="password" type="password" label="Password" onChange={e => this.handleChange(e)}/><br />
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
    storeUser: (user) => dispatch({ type: 'STORE_USER', user: user}),
    setUserType: (userType) => dispatch({ type: 'SET_USER_TYPE', userType: userType}),
    setLoginStatus: (status) => dispatch({ type: 'SET_LOGIN_STATUS', isLoggedIn: status}),
    setSigningUp: (condition) => dispatch({ type: 'SETTING_SIGNING_UP', signingUp: condition })
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm));