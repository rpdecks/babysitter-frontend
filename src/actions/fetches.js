import { API_ROOT } from '../services/apiRoot'

export const fetchData = (userType) => {
    const auth_token = localStorage.getItem('auth_token')
    const fetchObject = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Auth-Token': auth_token,
      }
    }
    return (dispatch) => {
        dispatch({ type: 'LOADING_DATA' })
        fetch(`${API_ROOT}/app_status`, fetchObject)
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
                dispatch({ type: 'STORE_EMPLOYERS', employers: appData.employers })
                dispatch({ type: 'STORE_AVAILABLE_JOBS', availableJobs: appData.available_jobs })
                dispatch({ type: 'STORE_INTERESTED_JOBS', interestedJobs: appData.interested_jobs })
            } else { console.log('No userType specific appData stored') }
            dispatch({ type: 'FINISH_LOADING' })
        })
        .catch(errors => console.log(errors))
    }
}

export const editUser = (id, userType, userObj) => {

    const fetchObj = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userObj)
    }

    return (dispatch) => {
        dispatch({ type: 'LOADING_DATA' })
        fetch(`${API_ROOT}/${userType}s/${id}`, fetchObj)
        .then(res => res.json())
        .then(userData => {
            if (userData.id) {
                dispatch({ type: 'STORE_USER_DATA', userData: userData })
            } else { alert(userData.msg) };
            dispatch({ type: 'FINISH_LOADING' })
        })
        .catch((errors) => console.log(errors))
    }
}

export const signup = (userObj, userType) => {

    const fetchObj = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userObj)
    }

    return (dispatch) => {
        dispatch({ type: 'LOADING_DATA' })
        fetch(`${API_ROOT}/${userType}s`, fetchObj)
        .then(res => res.json())
        .then(loginData => {
            if (loginData.token) {
                localStorage.setItem('auth_token', loginData.token)
                localStorage.setItem('userType', userType)
                dispatch({ type: 'SET_LOGIN_STATUS', isLoggedIn: true})
            } else { alert(loginData.msg) }
        })
        .then(res => dispatch(fetchData(userType)))
        .catch((errors) => alert(errors))
    }
}

export const loginFetch = (userType, userObj) => {

    const fetchObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userObj)
    }

    return (dispatch) => {
        dispatch({ type: 'LOADING_DATA' })
        if (userType === 'employer') {
        fetch(`${API_ROOT}/employers/login`, fetchObj)
            .then(res => res.json())
            .then(loginData => {
            if (loginData.token) {
                localStorage.setItem('auth_token', loginData.token)
                localStorage.setItem('userType', userType)
                dispatch({ type: 'SET_LOGIN_STATUS', isLoggedIn: true})
            }
            else
                alert(loginData.message);
            })
            .catch((errors) => alert(errors))
        } else if (userType === 'caregiver') {
        fetch(`${API_ROOT}/caregivers/login`, fetchObj)
            .then(res => res.json())
            .then(loginData => {
            if (loginData.token) {
                localStorage.setItem('auth_token', loginData.token)
                localStorage.setItem('userType', userType)
                dispatch({ type: 'SET_LOGIN_STATUS', isLoggedIn: true})
            }
            else
                alert(loginData.message);
                dispatch({ type: 'FINISH_LOADING' })
            })
            .catch((errors) => alert(errors))
        }
    }
}