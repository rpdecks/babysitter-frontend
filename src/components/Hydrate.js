import React from 'react';
import { connect } from 'react-redux'
 
class Hydrate extends React.Component {

    fetching = false
    render() {
        const auth_token = localStorage.getItem('auth_token')
        const userType = localStorage.getItem('userType')
        if (auth_token && userType) {
            this.props.setLoginStatus(true)
            this.props.setUserType(userType)
            this.fetchData(userType)
        } else {
            this.props.setLoginStatus(false)
        }
        return null
    }

  fetchData = (userType) => {
      if (this.fetching) return 
        this.fetching = true
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

export default connect(mapStateToProps, mapDispatchToProps)(Hydrate);
