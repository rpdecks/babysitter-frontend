import { ActionTypes } from "../actions/types";
import {
  StoreReviewsAction,
  StoreReviewsAboutMeAction,
  Review,
} from "../actions/actions";

export interface ReviewsState {
  authoredReviews: Review[];
  reviewsAboutMe: Review[];
}

interface AddReviewAction {
  type: ActionTypes.addReview;
  payload: Review;
}

interface DeleteReviewAction {
  type: ActionTypes.deleteReview;
  payload: number;
}

export default function reviewsReducer(
  state: ReviewsState = {
    authoredReviews: [],
    reviewsAboutMe: [],
  },
  action:
    | StoreReviewsAboutMeAction
    | StoreReviewsAction
    | AddReviewAction
    | DeleteReviewAction
) {
  switch (action.type) {
    case ActionTypes.storeReviews:
      return {
        ...state,
        authoredReviews: action.authoredReviews,
      };
    case ActionTypes.storeReviewsAboutMe:
      return {
        ...state,
        reviewsAboutMe: action.reviewsAboutMe,
      };
    case ActionTypes.addReview:
      return {
        ...state,
        authoredReviews: [...state.authoredReviews, action.payload],
      };
    case ActionTypes.deleteReview:
      return {
        ...state,
        authoredReviews: [
          ...state.authoredReviews.filter((rev) => rev.id !== action.payload),
        ],
      };
    default:
      return state;
  }
}
