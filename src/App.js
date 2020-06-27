import React from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import { Col, Container, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import Welcome from './components/Welcome'
import Dashboard from './components/Dashboard'
import LoginForm from './components/LoginForm'
import Appbar from './components/Appbar'
import { Modal, Button } from 'react-bootstrap'
 
class App extends React.Component {

  componentDidMount() {
    if (localStorage.getItem('auth_token')) {
      this.props.setLoginStatus(true)
    } else {
      this.props.setLoginStatus(false)
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
        <BrowserRouter>
          <Appbar />
          <Container fluid >
            <Col xs={2} >
              <Row>Hello I am the side bar</Row>
            </Col>
            <Col xs={8}>
              Middle column is right here as is wider
            </Col>
            <Switch>
              <Route exact path='/'>
                {this.selectFirstPage()}
              </Route>
              <Route exact path='/login'>
                {this.selectFirstPage()}
              </Route>
            </Switch>
          </Container>
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

const mapDispatchToProps = dispatch => {
  return {
      setUserType: (userType) => dispatch({ type: 'SET_USER_TYPE', userType: userType}),
      setLoginStatus: (status) => dispatch({type: 'SET_LOGIN_STATUS', isLoggedIn: status})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
