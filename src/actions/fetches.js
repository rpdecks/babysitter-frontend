import { API_ROOT } from '../services/apiRoot'

export const fetchData = (userType) => {
    const auth_token = localStorage.getItem('auth_token')
    const fetchObj = {  
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Auth-Token': auth_token,
        }
    }
    return (dispatch) => {
        dispatch({ type: 'LOADING_DATA' })
        fetch(`${API_ROOT}/app_status`, fetchObj)
        .then(res => res.json())
        .then(appData => {
            dispatch({ type: 'STORE_USER_JOBS', userJobs: appData.jobs })
            dispatch({ type: 'STORE_USER_DATA', userData: appData.user })
            if (userType === 'employer') {
                dispatch({ type: 'STORE_USER_FAVORITES', userFavorites: appData.employer_favorites })
                dispatch({ type: 'STORE_REVIEWS', authoredReviews: appData.employer_reviews })
                dispatch({ type: 'STORE_REVIEWS_ABOUT_ME', reviewsAboutMe: appData.caregiver_reviews })
                dispatch({ type: 'STORE_CAREGIVERS', caregivers: appData.caregivers })
            } else if (userType === 'caregiver') {
                dispatch({ type: 'STORE_USER_FAVORITES', userFavorites: appData.caregiver_favorites })
                dispatch({ type: 'STORE_REVIEWS', authoredReviews: appData.caregiver_reviews })
                dispatch({ type: 'STORE_REVIEWS_ABOUT_ME', reviewsAboutMe: appData.employer_reviews })
                dispatch({ type: 'STORE_CAREGIVERS', caregivers: appData.employers })
                dispatch({ type: 'STORE_AVAILABLE_JOBS', availableJobs: appData.available_jobs })
                dispatch({ type: 'STORE_INTERESTED_JOBS', interestedJobs: appData.interested_jobs })
            } else { console.log('No userType specific appData stored') }
            dispatch({ type: 'FINISH_LOADING' })
        })
        .catch(error => console.log(error))
    }
}