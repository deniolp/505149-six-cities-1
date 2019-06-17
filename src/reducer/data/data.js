const initialState = {
  city: {},
  offers: [],
  reviews: [],
  isReviewSending: false,
  didReviewSent: false,
  sendError: null,
  favorites: null,
};

const getRandomCity = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const snakeToCamel = (word) => word.replace(
    /(_\w)/g,
    (matches) => matches[1].toUpperCase()
);

const normalizeKeys = (obj) => {
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

const getCity = (selectedCity, offers) => offers.filter((offer) => offer.city.name === selectedCity)[0].city;

const changeOffer = (state, newOffer) => {
  return state.offers.map((item) => {
    return item.id === newOffer.id ? newOffer : item;
  });
};

const Operation = {
  loadOffers: () => (dispatch, _getState, api) => {
    return api.get(`/hotels`)
      .then((response) => {
        const preparedData = response.data.map((item) => normalizeKeys(item));
        dispatch(ActionCreator.loadOffers(preparedData));
      });
  },

  loadReviews: (id) => (dispatch, _getState, api) => {
    return api.get(`/comments/${id}`)
      .then((response) => {
        const preparedData = response.data.map((item) => normalizeKeys(item));
        dispatch(ActionCreator.loadReviews(preparedData));
      });
  },

  loadFavorites: () => (dispatch, _getState, api) => {
    return api.get(`/favorite`)
      .then((response) => {
        const preparedData = response.data.map((item) => normalizeKeys(item));
        dispatch(ActionCreator.loadFavorites(preparedData));
      });
  },

  postReview: (review, id) => (dispatch, _getState, api) => {
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

  addToFavorites: (id) => (dispatch, _getState, api) => {
    return api.post(`/favorite/${id}/1`)
      .then((response) => {
        const preparedData = normalizeKeys(response.data);
        dispatch(ActionCreator.addToFavorites(preparedData));
      })
      .catch((_error) => {});
  },

  deleteFromFavorites: (id) => (dispatch, _getState, api) => {
    return api.post(`/favorite/${id}/0`)
      .then((response) => {
        const preparedData = normalizeKeys(response.data);
        dispatch(ActionCreator.deleteFromFavorites(preparedData));
      })
      .catch((_error) => {});
  },
};

const ActionCreator = {
  changeCity: (selectedCity, places) => {
    const city = getCity(selectedCity, places);
    return {
      type: `CHANGE_CITY`,
      payload: city,
    };
  },
  loadOffers: (offers) => ({
    type: `LOAD_OFFERS`,
    payload: offers,
  }),
  loadReviews: (reviews) => ({
    type: `LOAD_REVIEWS`,
    payload: reviews,
  }),
  postReview: (reviews) => ({
    type: `POST_REVIEW`,
    payload: reviews,
  }),
  blockForm: (bool) => ({
    type: `BLOCK_FORM`,
    payload: bool,
  }),
  cleanForm: (bool) => ({
    type: `CLEAN_FORM`,
    payload: bool,
  }),
  showError: (error) => ({
    type: `SHOW_ERROR`,
    payload: error,
  }),
  addToFavorites: (data) => ({
    type: `ADD_TO_FAVORITES`,
    payload: data,
  }),
  deleteFromFavorites: (data) => ({
    type: `DELETE_FROM_FAVORITES`,
    payload: data,
  }),
  loadFavorites: (favorites) => ({
    type: `LOAD_FAVORITES`,
    payload: favorites,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `CHANGE_CITY`: return Object.assign({}, state, {
      city: action.payload,
    });

    case `LOAD_OFFERS`: return Object.assign({}, state, {
      city: action.payload[getRandomCity(1, action.payload.length)].city,
      offers: action.payload,
    });

    case `LOAD_REVIEWS`: return Object.assign({}, state, {
      reviews: action.payload,
    });

    case `POST_REVIEW`: return Object.assign({}, state, {
      reviews: action.payload,
    });

    case `BLOCK_FORM`: return Object.assign({}, state, {
      isReviewSending: action.payload,
    });

    case `CLEAN_FORM`: return Object.assign({}, state, {
      didReviewSent: action.payload,
    });

    case `SHOW_ERROR`: return Object.assign({}, state, {
      sendError: action.payload,
    });

    case `ADD_TO_FAVORITES`: return Object.assign({}, state, {
      offers: changeOffer(state, action.payload),
    });

    case `DELETE_FROM_FAVORITES`: return Object.assign({}, state, {
      offers: changeOffer(state, action.payload),
    });

    case `LOAD_FAVORITES`: return Object.assign({}, state, {
      favorites: action.payload,
    });
  }
  return state;
};

export {reducer, ActionCreator, Operation, normalizeKeys};
