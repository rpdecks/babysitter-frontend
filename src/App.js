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
import styled from 'styled-components'
import NewJobForm from './components/NewJobForm'
import Jobs from './components/Jobs'
import JobShow from './components/JobShow'
import Account from './components/Account'
import Reviews from './components/Reviews';
import FilterContainer from './containers/FilterContainer'
import CalendarView from './components/CalendarView'

const Styles = styled.div `
  .sidebar-column {
    border: black solid 1px;
    height: 95vh;
    background: #89cff0;
  }
  .center-column {
    border: black solid 1px;
    height: 95vh;
    overflow-y: scroll;
  }
  .right-column {
    border: black solid 1px;
    height: 95vh;
    background: #89cff0;
  };
`
 
class App extends React.Component {

  componentDidMount() {
    const auth_token = localStorage.getItem('auth_token')
    const userType = localStorage.getItem('userType') 
    if (auth_token && userType) {
      this.props.setLoginStatus(true)
      this.props.setUserType(userType)
      this.fetchData(userType)
    } else {
      this.props.setLoginStatus(false)
    }
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
        console.log(appData.jobs)
        this.props.storeUserJobs(appData.jobs)
        this.props.storeUserData(appData.user)
        this.props.storeEmployerReviews(appData.employer_reviews)
        this.props.storeCaregiverReviews(appData.caregiver_reviews)
        if (userType === 'employer') {
          this.props.storeEmployerFavorites(appData.employer_favorites)
          this.props.storeEmployerCaregivers(appData.caregivers)
        } else if (userType === 'caregiver') {
          this.props.storeCaregiverFavorites(appData.caregiver_favorites)
          this.props.storeCaregiverEmployers(appData.employers)
          this.props.storeAvailableJobs(appData.available_jobs)
          this.props.storeInterestedJobs(appData.interested_jobs)
        } else { console.log('No userType specific appData stored')}
      })
      .catch(error => console.log(error))
  }

  selectFirstPage = () => {
    if (!this.props.isLoggedIn && !this.props.userType) {
      return <Welcome />
    } else if (!this.props.isLoggedIn && this.props.userType) { 
    return <LoginForm /> }
  }
  
  whatToShowPage = () => {
    if (this.props.selectedJob) {
      return <JobShow />
    }
  }

  render() {
    return (
      <BrowserRouter>
        <Appbar />  
        <Styles>
          <Switch>
            <>
              <Row>
                <Col xs={2} className="sidebar-column">
                    <Route exact path='/jobs'>
                      <FilterContainer />
                    </Route>
                </Col>
                <Col xs={8} className="center-column">
                  {this.props.isLoggedIn && this.props.userType ? 
                    <>
                      <DashNav />
                    </>
                  :
                    <React.Fragment />}
                  <Route exact path='/'>
                    {this.selectFirstPage()}
                  </Route>
                  <Route exact path='/login'>
                    {this.selectFirstPage()}
                  </Route>
                  <Route exact path='/signup'>
                    {this.props.signingUp && this.props.userType && this.props.userType === 'caregiver' ? <CaregiverSignup /> : <EmployerSignup />}
                  </Route>
                  <Route exact path='/newjob'>
                    <NewJobForm />
                  </Route>
                  <Route exact path='/account'>
                    <Account />
                  </Route>
                  <Route exact path='/jobs'>
                    {this.props.calendarView ? <CalendarView /> : <Jobs />}
                  </Route>
                  <Route exact path='/reviews'>
                    <Reviews />
                  </Route>
                  <Route exact path='/show'>
                    <JobShow />
                  </Route>
                </Col>
                <Col xs={2} className="right-column">
                </Col>
              </Row>
            </>
          </Switch>
        </Styles>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    userType: state.userReducer.userType,
    isLoggedIn: state.userReducer.isLoggedIn, 
    signingUp: state.userReducer.signingUp,
    calendarView: state.userReducer.calendarView,
    selectedJob: state.jobReducer.selectedJob,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setUserType: (userType) => dispatch({ type: 'SET_USER_TYPE', userType: userType}),
    setLoginStatus: (status) => dispatch({type: 'SET_LOGIN_STATUS', isLoggedIn: status}),
    storeUserJobs: (userJobs) => dispatch({type: 'STORE_USER_JOBS', userJobs: userJobs}),
    storeAvailableJobs: (availableJobs) => dispatch({type: 'STORE_AVAILABLE_JOBS', availableJobs: availableJobs}),
    storeUserData: (userData) => dispatch({type: 'STORE_USER_DATA', userData: userData}),
    storeEmployerReviews: (reviews) => dispatch({type: 'STORE_EMPLOYER_REVIEWS', employerReviews: reviews}),
    storeCaregiverReviews: (reviews) => dispatch({type: 'STORE_CAREGIVER_REVIEWS', caregiverReviews: reviews}),
    storeEmployerFavorites: (favorites) => dispatch({type: 'STORE_EMPLOYER_FAVORITES', employerFavorites: favorites}),
    storeEmployerCaregivers: (caregivers) => dispatch({type: 'STORE_EMPLOYER_CAREGIVERS', employerCaregivers: caregivers}),
    storeCaregiverFavorites: (favorites) => dispatch({type: 'STORE_CAREGIVER_FAVORITES', caregiverFavorites: favorites}),
    storeCaregiverEmployers: (employers) => dispatch({type: 'STORE_CAREGIVER_EMPLOYERS', caregiverEmployers: employers}),
    storeInterestedJobs: (jobs) => dispatch({type: 'STORE_INTERESTED_JOBS', interestedJobs: jobs}),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
