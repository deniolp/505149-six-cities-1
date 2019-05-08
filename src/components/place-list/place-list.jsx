import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Place from '../place/place.jsx';

class PlaceList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeCard: null,
    };
  }

  render() {
    const {places, onClick} = this.props;
    return <div className="cities__places-list places__list tabs__content">
      {
        places.map((item, index) => {
          return this._getPlace(item, index, onClick, () => {
            this.setState({
              activeCard: item,
            });
          });
        })
      }
    </div>;
  }

  _getPlace(item, index, onClick, onMouseEnter) {
    return <Place
      place={item}
      key={index}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
    />;
  }
}

PlaceList.propTypes = {
  places: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    isPremium: PropTypes.bool.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    bookmarked: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  })).isRequired,
  onClick: PropTypes.func,
};

export default PlaceList;
