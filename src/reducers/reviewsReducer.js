export default function reviewsReducer(state = {}, action) {
    switch (action.type) {
    case 'STORE_REVIEWS':
        return {
            ...state,
            reviews: action.reviews
        }
    default:
        return state;
    }
}