import {Place, Review} from '../../types';

enum TYPE {
  CHANGE_CITY = 'CHANGE_CITY',
  LOAD_OFFERS = 'LOAD_OFFERS',
  LOAD_REVIEWS = 'LOAD_REVIEWS',
  POST_REVIEW = 'POST_REVIEW',
  BLOCK_FORM = 'BLOCK_FORM',
  CLEAN_FORM = 'CLEAN_FORM',
  SHOW_ERROR = 'SHOW_ERROR',
  ADD_TO_FAVORITES = 'ADD_TO_FAVORITES',
  DELETE_FROM_FAVORITES = 'DELETE_FROM_FAVORITES',
}

interface ActionType {
  type: TYPE,
  payload: any
}

const initialState = {
  city: {},
  offers: [],
  reviews: [],
  isReviewSending: false,
  didReviewSent: false,
  sendError: null,
};

const getRandomCity = (min: number, max: number): number => Math.floor(Math.random() * (max - min)) + min;

const snakeToCamel = (word: string): string => word.replace(
    /(_\w)/g,
    (matches) => matches[1].toUpperCase()
);

const normalizeKeys = (obj: object): object => {
  if (Array.isArray(obj)) {
    return obj.map((item) => normalizeKeys(item));
  }

  if (obj !== null && obj.constructor === Object) {
    return Object.keys(obj).reduce((acc, key) => ({
      ...acc,
      [snakeToCamel(key)]: normalizeKeys(obj[key])
    }), {});
  }

  return obj;
};

const changeOffer = (offers: Place[], newOffer: Place) => {
  return offers.map((item) => {
    return item.id === newOffer.id ? newOffer : item;
  });
};

const getCity = (selectedCity: string, offers: Place[]) => offers.filter((offer) => offer.city.name === selectedCity)[0].city;

const Operation = {
  loadOffers: () => (dispatch, _getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        const preparedData = response.data.map((item) => normalizeKeys(item));
        dispatch(ActionCreator.loadOffers(preparedData));
      });
  },

  loadReviews: (id: number) => (dispatch, _getState, api) => {
    return api.get(`/comments/${id}`)
      .then((response) => {
        const preparedData = response.data.map((item) => normalizeKeys(item));
        dispatch(ActionCreator.loadReviews(preparedData));
      });
  },

  postReview: (review: Review, id: number) => (dispatch, _getState, api) => {
    return api.post(`/comments/${id}`, review)
      .then((response) => {
        const preparedData = response.data.map((item) => normalizeKeys(item));
        dispatch(ActionCreator.postReview(preparedData));
        dispatch(ActionCreator.showError(null));
        dispatch(ActionCreator.blockForm(false));
        dispatch(ActionCreator.cleanForm(true));
      })
      .catch((_error) => {
        dispatch(ActionCreator.blockForm(false));
        dispatch(ActionCreator.showError(`Error occured :-(`));
      });
  },
};

const ActionCreator = {
  changeCity: (selectedCity: string, places: Place[]) => {
    const city = getCity(selectedCity, places);
    return {
      type: TYPE.CHANGE_CITY,
      payload: city,
    };
  },
  loadOffers: (offers: Place[]) => ({
    type: TYPE.LOAD_OFFERS,
    payload: offers,
  }),
  loadReviews: (reviews: Review[]) => ({
    type: TYPE.LOAD_REVIEWS,
    payload: reviews,
  }),
  postReview: (reviews: Review[]) => ({
    type: TYPE.POST_REVIEW,
    payload: reviews,
  }),
  blockForm: (bool: boolean) => ({
    type: TYPE.BLOCK_FORM,
    payload: bool,
  }),
  cleanForm: (bool: boolean) => ({
    type: TYPE.CLEAN_FORM,
    payload: bool,
  }),
  showError: (error: any) => ({
    type: TYPE.SHOW_ERROR,
    payload: error,
  }),
  addToFavorites: (data: object) => ({
    type: TYPE.ADD_TO_FAVORITES,
    payload: data,
  }),
  deleteFromFavorites: (data: object) => ({
    type: TYPE.DELETE_FROM_FAVORITES,
    payload: data,
  }),
};

const reducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case TYPE.CHANGE_CITY: return Object.assign({}, state, {
      city: action.payload,
    });

    case TYPE.LOAD_OFFERS: return Object.assign({}, state, {
      city: action.payload[getRandomCity(1, action.payload.length)].city,
      offers: action.payload,
    });

    case TYPE.LOAD_REVIEWS: return Object.assign({}, state, {
      reviews: action.payload,
    });

    case TYPE.POST_REVIEW: return Object.assign({}, state, {
      reviews: action.payload,
    });

    case TYPE.BLOCK_FORM: return Object.assign({}, state, {
      isReviewSending: action.payload,
    });

    case TYPE.CLEAN_FORM: return Object.assign({}, state, {
      didReviewSent: action.payload,
    });

    case TYPE.SHOW_ERROR: return Object.assign({}, state, {
      sendError: action.payload,
    });

    case TYPE.ADD_TO_FAVORITES: return Object.assign({}, state, {
      offers: changeOffer(state.offers, action.payload),
    });

    case TYPE.DELETE_FROM_FAVORITES: return Object.assign({}, state, {
      offers: changeOffer(state.offers, action.payload),
    });
  }
  return state;
};

export {reducer, ActionCreator, Operation, normalizeKeys};
