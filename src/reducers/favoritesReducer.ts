import { ActionTypes, Favorite, Action } from "../actions";

export interface FavoritesState {
  userFavorites: Favorite[];
  favoritesFilter: boolean;
}

export interface AddFavoriteAction {
  type: ActionTypes.addFavorite;
  favorite: Favorite;
}

export interface DeleteFavoriteAction {
  type: ActionTypes.deleteFavorite;
  favoriteInstanceId: number;
}

export interface FilterByFavoritesAction {
  type: ActionTypes.filterByFavorites;
  favoritesFilter: boolean;
}

export default function favoritesReducer(
  state: FavoritesState = { userFavorites: [], favoritesFilter: false },
  action: Action
) {
  switch (action.type) {
    case ActionTypes.addFavorite:
      return {
        ...state,
        userFavorites: [...state.userFavorites, action.favorite],
      };
    case ActionTypes.deleteFavorite:
      return {
        ...state,
        userFavorites: [
          ...state.userFavorites.filter(
            (fav) => fav.id !== action.favoriteInstanceId
          ),
        ],
      };
    case ActionTypes.storeUserFavorites:
      return {
        ...state,
        userFavorites: action.userFavorites,
      };
    case ActionTypes.filterByFavorites:
      return {
        ...state,
        favoritesFilter: action.favoritesFilter,
      };
    default:
      return state;
  }
}
