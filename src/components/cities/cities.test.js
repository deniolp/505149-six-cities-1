import React from 'react';
import renderer from 'react-test-renderer';
import Cities from '../cities/cities';

describe(`Cities`, () => {
  const cities = [`Berlin`, `Dusseldorf`];

  it(`renders correctly`, () => {
    const tree = renderer.create(<Cities
      cities={cities}
      city={`Berlin`}
      onCityClick={jest.fn()}
      setHighlightedItem={jest.fn()}
      active={`Berlin`}
    />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});