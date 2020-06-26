import React from 'react';
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

  login = e => {
    e.preventDefault();

    const userObj = {
      user: {
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

    fetch('http://localhost:3000/api/v1/login', fetchObj)
      .then(res => res.json())
      .then(loginData => {
        if (loginData.token) {
          this.props.handleLogin(loginData.token)
          this.props.history.push('/');
        }
        else
          alert(loginData.message);
      })
      .catch(() => alert('Something went wrong'))

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

export default withRouter(LoginForm);