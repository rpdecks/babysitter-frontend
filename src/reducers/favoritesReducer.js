export default function favoritesReducer(state = {}, action) {
    switch (action.type) {
    case 'FAVORITE_USER':
        return {
            ...state,
            employerFavorites: [...state.employerFavorites, action.favorite]
        }
    case 'UNFAVORITE_USER':
        return {
            ...state,   
            employerFavorites: [...state.employerFavorites.filter(fav => fav.id !== action.favoriteInstanceId)]
        }
    case 'STORE_USER_FAVORITES':
        return {
            ...state,
            userFavorites: action.userFavorites
        }
    default:
        return state;
    }
}