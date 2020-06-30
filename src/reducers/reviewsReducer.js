export default function reviewsReducer(state = {}, action) {
    switch (action.type) {
    case 'STORE_EMPLOYER_REVIEWS':
        return {
            ...state,
            employer_reviews: action.employerReviews
        }
    case 'STORE_CAREGIVER_REVIEWS':
        return {
            ...state,
            caregiverReviews: action.caregiverReviews
        }
    default:
        return state;
    }
}