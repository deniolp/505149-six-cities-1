import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import withHighlightedItem from '../../hocs/with-highlighted-item/with-highlighted-item';
import Place from '../place/place';

class PlaceList extends PureComponent {
  render() {
    const {offers, onClickHandler, setHighlightedItem, active} = this.props;
    return <div className="cities__places-list places__list tabs__content">
      {
        offers.map((item) => {
          return this._getPlace(item, onClickHandler, setHighlightedItem, active);
        })
      }
    </div>;
  }

  _getPlace(item, onClickHandler, setHighlightedItem, active) {
    return <Place
      place={item}
      key={item.id}
      onClickHandler={onClickHandler}
      setHighlightedItem={setHighlightedItem}
      active={item.id === active}
    />;
  }
}

PlaceList.propTypes = {
  offers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    isPremium: PropTypes.bool.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    isFavorite: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired,
    previewImage: PropTypes.string.isRequired,
    images: PropTypes.array.isRequired,
    goods: PropTypes.array.isRequired,
    bedrooms: PropTypes.number.isRequired,
    maxAdults: PropTypes.number.isRequired,
    host: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    city: PropTypes.shape({
      name: PropTypes.string.isRequired,
      location: PropTypes.object.isRequired,
    }).isRequired,
  })).isRequired,
  onClickHandler: PropTypes.func.isRequired,
  setHighlightedItem: PropTypes.func.isRequired,
  active: PropTypes.number,
};

export default withHighlightedItem(PlaceList);
