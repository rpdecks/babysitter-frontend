export default function favoritesReducer(state = {favoritesFilter: false,}, action) {
    switch (action.type) {
    case 'FAVORITE_USER':
        return {
            ...state,
            userFavorites: [...state.userFavorites, action.favorite]
        }
    case 'UNFAVORITE_USER':
        return {
            ...state,   
            userFavorites: [...state.userFavorites.filter(fav => fav.id !== action.favoriteInstanceId)]
        }
    case 'STORE_USER_FAVORITES':
        return {
            ...state,
            userFavorites: action.userFavorites
        }
    case 'FILTER_BY_FAVORITES':
      return {
        ...state,
        favoritesFilter: action.favoritesFilter
      }
    default:
        return state;
    }
}