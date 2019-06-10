import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import withActiveCard from './with-active-card';

Enzyme.configure({adapter: new Adapter()});

const Mock = () => <div />;
const MockWrapped = withActiveCard(Mock);

it(`Should change activeCard`, () => {
  const wrapper = shallow(<MockWrapped
    activeCard={{}}
    onClickHandler={jest.fn()}
    city={{}}
  />);

  expect(wrapper.state().activeCard).toEqual({});
  expect(wrapper.props().activeCard).toEqual({});
  wrapper.props().onClickHandler({type: 8});
  expect(wrapper.state().activeCard).toEqual({type: 8});
  expect(wrapper.props().activeCard).toEqual({type: 8});
});
