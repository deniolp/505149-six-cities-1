import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Place from '../place/place';

Enzyme.configure({adapter: new Adapter()});

const mockObj = {
  id: 1,
  title: `Strange place`,
  isPremium: true,
  price: 1200,
  rating: 1.9,
  isFavorite: false,
  description: ``,
  type: `Apartment`,
  previewImage: ``,
  images: [``],
  goods: [``],
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
  }
};

let clickHandler;
let placeElement;
let placeDescription;
let image;
let placeObj = {};

beforeEach(() => {
  clickHandler = jest.fn();
  placeElement = shallow(
      <Place
        place={mockObj}
        onClickHandler={() => {
          placeObj = mockObj;
        }}
        setHighlightedItem={clickHandler}
        active={false}
      />);
  placeDescription = placeElement.find(`Link`);
  image = placeElement.find(`.place-card__image`);
});

describe(`Before clicking`, () => {
  it(`should have the description element`, () => {
    expect(placeDescription).toHaveLength(1);
  });

  it(`clickHandler should not be called`, () => {
    expect(clickHandler).toHaveBeenCalledTimes(0);
  });
});

describe(`Link should go`, () => {
  it(`to the right path`, () => {

    expect(placeDescription.props().to).toBe(`/offer/1`);
  });
});


it(`Click on image should put in state right object`, () => {
  image.simulate(`click`);

  expect(placeObj).toEqual(mockObj);
});
