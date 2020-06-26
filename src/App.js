import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css';
import Welcome from './components/Welcome';
import Dashboard from './components/Dashboard';
import LoginForm from './components/LoginForm';

class App extends React.Component {
  state = {
    isLoggedIn: false,
    userType: ''
  }
  
  handleLogin = token => {
    localStorage.setItem('auth_token', token);
    this.setState({ isLoggedIn: true })
    this.getUserData();
  }

  handleLogout = () => {
    localStorage.removeItem('auth_token');
    this.setState({ isLoggedIn: false })
  }

  setUserType = (input) => {
    this.setState({ userType: input})
  }

  selectFirstPage = () => {
    if (!this.state.userType) {
      return <Welcome setUserType={this.setUserType} /> 
    } else if (this.state.userType && !this.state.isLoggedIn) {
      return <LoginForm handleLogin={this.handleLogin} setUserType={this.setUserType} />
    } else { return <Dashboard /> }
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/'>
            {this.selectFirstPage()}
          </Route>
          <Route exact path='/login'>
            {/* <LoginForm handleLogin={this.handleLogin}/> */}
            {this.selectFirstPage()}
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
