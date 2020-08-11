import { API_ROOT} from '../services/apiRoot'

export const fetchData = (userType, props) => {
    const auth_token = localStorage.getItem('auth_token')
    const fetchObj = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Auth-Token': auth_token,
      }
    }
    fetch(`${API_ROOT}/app_status`, fetchObj)
      .then(res => res.json())
      .then(appData => {
        props.storeUserJobs(appData.jobs)
        props.storeUserData(appData.user)
        if (userType === 'employer') {
          props.storeUserFavorites(appData.employer_favorites)
          props.storeAuthoredReviews(appData.employer_reviews)
          props.storeReviewsAboutMe(appData.caregiver_reviews)
          props.storeCaregivers(appData.caregivers)
        } else if (userType === 'caregiver') {
          props.storeUserFavorites(appData.caregiver_favorites)
          props.storeAuthoredReviews(appData.caregiver_reviews)
          props.storeReviewsAboutMe(appData.employer_reviews)
          props.storeEmployers(appData.employers)
          props.storeAvailableJobs(appData.available_jobs)
          props.storeInterestedJobs(appData.interested_jobs)
        } else { console.log('No userType specific appData stored') }
        props.hydrateComplete()
      })
      .catch(error => console.log(error))
}
