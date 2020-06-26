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
    this.props.setLoginStatus(true)
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
      <form onSubmit={(e) => this.login(e)}>
        <label>Email:
          <input name="email" label="Email" onChange={e => this.handleChange(e)} />
        </label>
        <label>Password:
          <input name="password" type="password" label="Password" onChange={e => this.handleChange(e)} />
        </label>
        <input type="submit" value="Submit" />
        <Link to="/" onClick={() => this.props.setUserType('')}>
            <button type="button">
                Back
            </button>
        </Link>
      </form>
    )
  }
}

const mapStateToProps = state => {
  return { 
    userType: state.userReducer.userType,
    isLoggedIn: state.userReducer.isLoggedIn
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setUserType: (userType) => dispatch({ type: 'SET_USER_TYPE', userType: userType}),
    setLoginStatus: (status) => dispatch({ type: 'SET_LOGIN_STATUS', isLoggedIn: status})
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm));