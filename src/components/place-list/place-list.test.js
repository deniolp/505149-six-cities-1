import React from 'react';
import renderer from 'react-test-renderer';
import PlaceList from '../place-list/place-list.jsx';

describe(`PlaceList`, () => {
  const places = [
    {
      title: `Strange place`,
      isPremium: true,
      price: 1200,
      rating: 95,
      bookmarked: false,
      type: `Apartment`,
      image: ``,
    },
    {
      title: `Weird place`,
      isPremium: false,
      price: 80,
      rating: 80,
      bookmarked: true,
      type: `Room`,
      image: ``,
    },
  ];

  it(`renders correctly`, () => {
    const tree = renderer.create(<PlaceList
      places={places}
      onClick={jest.fn()}
    />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
