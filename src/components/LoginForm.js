import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import styled from 'styled-components'
import { FaBabyCarriage } from 'react-icons/fa'
import { API_ROOT} from '../services/apiRoot'
import { fetchData } from '../actions/fetches'

const Styles = styled.div ` 
  margin-top: 5rem;
  font-family: 'Roboto', sans-serif;

  .header-text {
    font-family: 'Pacifico', cursive;
    text-align: center;
    font-size: large;
    color: #757575;
  }
  .brand {
    text-align: center;
    font-size: xx-large;
    color: #0097A7;
    font-family: 'Pacifico', cursive;
  }
  .instructions {
    text-align: center;
    font-size: medium;
    color: #757575;
    margin-top: 1rem; 
    margin-bottom: 1rem; 
  }
  .form-div {
    margin-top: 2 rem;
    text-align: center;
    float: center;
    color: #757575;
  }
  a:link {
      color: #00BCD4;
  }
  a:visited {
      color: #757575;
  }
`


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
    this.props.fetchData(this.props.userType)
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
      fetch(`${API_ROOT}/employers/login`, fetchObj)
        .then(res => res.json())
        .then(loginData => {
          if (loginData.token) {
            this.handleLogin(loginData.token)
            this.props.history.push('/pending-jobs')
          }
          else
            alert(loginData.message);
        })
        .catch((errors) => alert(errors))
    } else if (this.props.userType === 'caregiver') {
      fetch(`${API_ROOT}/caregivers/login`, fetchObj)
        .then(res => res.json())
        .then(loginData => {
          if (loginData.token) {
            this.handleLogin(loginData.token)
            this.props.history.push('/jobs')
          }
          else
            alert(loginData.message);
        })
        .catch((errors) => alert(errors))
      }
    e.target.reset()
  }

  render() {
    return (
      <Styles>
        <div className='header-text'>
          Welcome to
        </div>
        <div className='brand'>
        <FaBabyCarriage />
        Babysitter!
        <FaBabyCarriage />
        </div>
        <div className='instructions'>
          Login below to your <em><b>{this.props.userType}</b></em> account below:
        </div>
        <div className='form-div'>
          <form onSubmit={(e) => this.login(e)}>
          <label>Email:</label><br />
          <input name="email" label="Email" onChange={e => this.handleChange(e)} /><br />
          <label>Password:</label><br />
          <input name="password" type="password" label="Password" onChange={e => this.handleChange(e)} /><br />
          <Button type="submit" style={{ backgroundColor: "#0097A7", color: 'white', border: '0', marginLeft: '5px', marginTop: '1rem', marginBottom: '0.5rem' }} >
              Submit
          </Button>
          <Button onClick={() => this.props.setUserType(null)} style={{ backgroundColor: "#0097A7", color: 'white', border: '0', marginLeft: '5px', marginTop: '1rem', marginBottom: '0.5rem' }} >
              Cancel
          </Button><br />
          <Link to="/signup" onClick={() => this.props.setSigningUp(true)}>Create an account</Link>
          </form>
          </div>
      </Styles>
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
    setSigningUp: (condition) => dispatch({ type: 'SETTING_SIGNING_UP', signingUp: condition }),
    setLoginStatus: (status) => dispatch({type: 'SET_LOGIN_STATUS', isLoggedIn: status}),
    fetchData: (userType) => dispatch(fetchData(userType))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm));