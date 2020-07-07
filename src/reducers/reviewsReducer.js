export default function reviewsReducer(state = {}, action) {
    switch (action.type) {
    case 'STORE_REVIEWS':
        return {
            ...state,
            authoredReviews: action.authoredReviews
        }
    case 'STORE_REVIEWS_ABOUT_ME':
        return {
            ...state,
            reviewsAboutMe: action.reviewsAboutMe
        }
    case 'ADD_REVIEW':
        return {
            ...state,
            authoredReviews: [ ...state.authoredReviews, action.newReview ]
        }
    case 'DELETE_REVIEW':
        return {
            ...state,
            authoredReviews: [ ...state.authoredReviews.filter(rev => rev.id !== action.deletedReview) ]
        }
    default:
        return state;
    }
}