import { ActionTypes } from "../actions/types";
import { Favorite, StoreUserFavoritesAction } from "../actions/actions";

export interface FavoritesState {
  userFavorites: Favorite[];
  favoritesFilter: boolean;
}

interface AddFavoriteAction {
  type: ActionTypes.addFavorite;
  favorite: Favorite;
}

interface DeleteFavoriteAction {
  type: ActionTypes.deleteFavorite;
  favoriteInstanceId: number;
}

interface FilterByFavoritesAction {
  type: ActionTypes.filterByFavorites;
  favoritesFilter: boolean;
}

export default function favoritesReducer(
  state: FavoritesState = { userFavorites: [], favoritesFilter: false },
  action:
    | AddFavoriteAction
    | DeleteFavoriteAction
    | StoreUserFavoritesAction
    | FilterByFavoritesAction
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
