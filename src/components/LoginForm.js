import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import styled from 'styled-components'
import { FaBabyCarriage } from 'react-icons/fa'
import { fetchData, loginFetch } from '../actions/fetches'

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
  }

  login = e => {
    e.preventDefault();

    console.log(this.props);

    const userObj = {
      [this.props.userType]: {
        email: this.state.email,
        password: this.state.password
      }
    }

    this.props.loginFetch(this.props.userType, userObj)
    if (this.props.userType === 'employer') {
      this.props.history.push('/pending-jobs')
    } else { this.props.history.push('/jobs') }
    this.props.fetchData(this.props.userType)
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
    setUserType: (value) => dispatch({ type: 'SET_USER_TYPE', userType: value}),
    fetchData: (userType) => dispatch(fetchData(userType)),
    loginFetch: (userType, userObj) => dispatch(loginFetch(userType, userObj)),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm));