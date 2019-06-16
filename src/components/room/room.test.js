import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import {Room} from '../room/room';
import {Operation} from '../../reducer/data/data';
import NameSpace from '../../reducer/name-space';

jest.mock(`../../reducer/data/data`);
Operation.loadReviews = () => (dispatch) => dispatch(jest.fn());

const offers = [
  {
    id: 1,
    title: `Strange place`,
    isPremium: true,
    price: 1200,
    rating: 1.8,
    isFavorite: false,
    description: ``,
    type: `Apartment`,
    previewImage: ``,
    images: [],
    goods: [],
    bedrooms: 2,
    maxAdults: 4,
    host: {},
    location: {
      atitude: 12,
      longitude: 87,
      zoom: 11,
    },
    city: {
      name: `Berlin`,
      location: {
        atitude: 51,
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
    isFavorite: true,
    description: ``,
    type: `Private room`,
    previewImage: ``,
    images: [],
    goods: [],
    bedrooms: 2,
    maxAdults: 4,
    host: {},
    location: {
      atitude: 13,
      longitude: 88,
      zoom: 11,
    },
    city: {
      name: `Dusseldorf`,
      location: {
        atitude: 52,
        longitude: 8,
        zoom: 11,
      },
    },
  },
];

const NAME_SPACE = NameSpace.DATA;
const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const initialState = {};
initialState[NAME_SPACE] = {
  city: {},
  offers: [],
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
};
const store = mockStore(initialState);

describe(`Room`, () => {
  it(`renders correctly`, () => {
    const tree = renderer.create(<BrowserRouter><Provider store={store}><Room
      offers={offers}
      match={{
        params: {
          id: 2,
        },
      }}
      onLoadOffers={jest.fn()}
      onClickHandler={jest.fn()}
      activeCard={offers[1]}
    /></Provider></BrowserRouter>).toJSON();

    expect(tree).toMatchSnapshot();
  });
});