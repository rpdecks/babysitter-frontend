import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import Welcome from './components/Welcome'
import Dashboard from './components/Dashboard'
import LoginForm from './components/LoginForm'
import Appbar from './components/Appbar'
 
class App extends React.Component {

  componentDidMount() {
    if (localStorage.getItem('auth_token')) {
      this.props.dispatch({type: 'SET_LOGIN_STATUS', isLoggedIn: true})
    } else {
      this.props.dispatch({type: 'SET_LOGIN_STATUS', isLoggedIn: false})
    }
  }

  selectFirstPage = () => {
    if (!this.props.isLoggedIn && !this.props.userType) {
      return <Welcome /> 
    } else if (!this.props.isLoggedIn && this.props.userType) { 
      return <LoginForm />
    } else { return <Dashboard />}
  }

  render() {
    return (
      <>
        <Appbar />
        <Col xs={2} >
          <Row>Hello I am the side bar</Row>
        </Col>
        <BrowserRouter>
          <Switch>
            <Route exact path='/'>
              {this.selectFirstPage()}
            </Route>
            <Route exact path='/login'>
              {this.selectFirstPage()}
            </Route>
          </Switch>
        </BrowserRouter>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    userType: state.userReducer.userType,
    isLoggedIn: state.userReducer.isLoggedIn, 
  }
}

export default connect(mapStateToProps)(App);
