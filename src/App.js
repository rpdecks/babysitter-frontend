import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import Welcome from './components/Welcome'
import LoginForm from './components/LoginForm'
import CaregiverSignup from './components/CaregiverSignup'
import EmployerSignup from './components/EmployerSignup'
import Appbar from './components/Appbar'
import DashNav from './components/DashNav'
import CalendarView from './components/CalendarView'
import styled from 'styled-components'

const Styles = styled.div `
  .sidebar-column {
    border: black solid 1px;
    height: 90vh;
    background: dodgerblue
  }
  .center-column {
    border: black solid 1px;
    height: 90vh;
  }
`
 
class App extends React.Component {

  componentDidMount() {
    if (localStorage.getItem('auth_token') && localStorage.getItem('userType')) {
      this.props.setLoginStatus(true)
      this.props.setUserType(localStorage.getItem('userType'))
    } else {
      this.props.setLoginStatus(false)
    }
  }
  
  selectFirstPage = () => {
    if (this.props.isLoggedIn && this.props.userType) {
      return (
        <>
          <DashNav />
          <CalendarView />
        </>
      )
    } else if (!this.props.isLoggedIn && !this.props.userType) {
      return <Welcome />
    } else if (!this.props.isLoggedIn && this.props.userType) { 
    return <LoginForm /> }
  }

  render() {
    return (
      <BrowserRouter>
        <Appbar />  
        <Styles>
          <Row>
            <Col xs={2} className="sidebar-column">
              <Row>Hello I am the side bar</Row>
            </Col>
            <Switch>
              <>
                <Col xs={8} className="center-column">
                  <Route exact path='/'>
                    {this.selectFirstPage()}
                  </Route>
                  <Route exact path='/login'>
                    {this.selectFirstPage()}
                  </Route>
                  <Route exact path='/signup'>
                    {this.props.signingUp && this.props.userType && this.props.userType === 'caregiver' ? <CaregiverSignup /> : <EmployerSignup />}
                  </Route>
                </Col>
              </>
            </Switch>
          </Row>
        </Styles>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    userType: state.userReducer.userType,
    isLoggedIn: state.userReducer.isLoggedIn, 
    signingUp: state.userReducer.signingUp
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setUserType: (userType) => dispatch({ type: 'SET_USER_TYPE', userType: userType}),
    setLoginStatus: (status) => dispatch({type: 'SET_LOGIN_STATUS', isLoggedIn: status}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
