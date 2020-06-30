export default function favoritesReducer(state = {}, action) {
    switch (action.type) {
    case 'STORE_EMPLOYER_FAVORITES':
        return {
            ...state,
            employerFavorites: action.employerFavorites
        }
    case 'STORE_CAREGIVER_FAVORITES':
        return {
            ...state,
            caregiverFavorites: action.caregiverFavorites
        }
    default:
        return state;
    }
}