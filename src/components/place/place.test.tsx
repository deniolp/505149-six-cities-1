import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import {Place} from './place';
import {Operation as OperationUser} from '../../reducer/user/user';
import NameSpace from '../../reducer/name-space';

jest.mock(`../../reducer/user/user`);
OperationUser.authorizeUser = () => (dispatch) => dispatch(jest.fn());

describe(`Place`, () => {
  const mockOffers = [
    {
      id: 1,
      title: `Strange place`,
      isPremium: true,
      price: 1200,
      rating: 1.5,
      isFavorite: false,
      description: ``,
      type: `Apartment`,
      previewImage: `3.jpg`,
      images: [`4.jpg`],
      goods: [``],
      bedrooms: 2,
      maxAdults: 4,
      host: {
        id: 2,
        email: `y@ya.ru`,
        name: `Alice`,
        avatarUrl: `path`,
        isPro: false
      },
      location: {
        latitude: 12,
        longitude: 87,
        zoom: 11,
      },
      city: {
        name: `Berlin`,
        location: {
          latitude: 51,
          longitude: 7,
          zoom: 11,
        },
      },
    },
    {
      id: 2,
      title: `Weird place`,
      isPremium: true,
      price: 800,
      rating: 1.5,
      isFavorite: false,
      description: ``,
      type: `Private room`,
      previewImage: `2.jpg`,
      images: [`1.jpg`],
      goods: [``],
      bedrooms: 2,
      maxAdults: 4,
      host: {
        id: 3,
        email: `r@ya.ru`,
        name: `Alice`,
        avatarUrl: `path`,
        isPro: true
      },
      location: {
        latitude: 13,
        longitude: 88,
        zoom: 11,
      },
      city: {
        name: `Dusseldorf`,
        location: {
          latitude: 52,
          longitude: 8,
          zoom: 11,
        },
      },
    },
  ];

  const NAME_SPACE_DATA = NameSpace.DATA;
  const NAME_SPACE_USER = NameSpace.USER;
  const middleware = [thunk];
  const mockStore = configureMockStore(middleware);
  const initialState = {};
  initialState[NAME_SPACE_DATA] = {
    city: {},
    offers: mockOffers,
    reviews: [
      {
        id: 1,
        comment: `Weird place`,
        rating: 1.5,
        date: `2019-05-16T21:02:58.227Z`,
        user: {
          avatarUrl: `path.jpg`,
          id: 8,
          isPro: false,
          name: `Kurt`,
        },
      },
      {
        id: 2,
        comment: `Strange place`,
        rating: 2.5,
        date: `2019-06-16T21:02:58.227Z`,
        user: {
          avatarUrl: `path.jpg`,
          id: 9,
          isPro: false,
          name: `Kate`,
        },
      },
    ],
    isReviewSending: false,
    didReviewSent: false,
    sendError: null,
  };
  initialState[NAME_SPACE_USER] = {
    user: {},
    authError: null,
    isAuthorizationRequired: false,
  };
  const store = mockStore(initialState);

  it(`renders correctly`, () => {
    const tree = renderer.create(<BrowserRouter>
      <Provider store={store}><Place
        place={mockOffers[0]}
        onPlaceClick={jest.fn()}
        offers={mockOffers}
        activeCardId={null}
      /></Provider>
    </BrowserRouter>).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
