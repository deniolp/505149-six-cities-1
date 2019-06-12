import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

class Map extends PureComponent {
  constructor(props) {
    super(props);

    this.map = null;
  }

  render() {
    const className = this.props.className || `cities__map map`;
    return <section id="map" className={className}></section>;
  }

  componentDidMount() {
    const {offers, city, leaflet} = this.props;
    try {
      this._renderMap(offers, city, leaflet);
    } catch (error) {
      // global.console.log(error)
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      const {offers, city, leaflet, activeCard} = this.props;
      if (this.map) {
        this.map.remove();
      }
      this._renderMap(offers, city, leaflet, activeCard);
    }
  }

  _renderMap(offers, city, leaflet, activeCard = null) {
    let settings = {};
    const {latitude, longitude, zoom} = city.location;
    const icon = leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [27, 31]
    });
    const orangeIcon = leaflet.icon({
      iconUrl: `img/active-pin.svg`,
      iconSize: [28, 32]
    });

    if (Object.keys(activeCard).length !== 0) {
      settings = {
        center: [activeCard.location.latitude, activeCard.location.longitude],
        zoom: 13,
        zoomControl: false,
        marker: true
      };
    } else {
      settings = {
        center: [latitude, longitude],
        zoom: 13,
        zoomControl: false,
        marker: true
      };
    }

    this.map = leaflet.map(`map`, settings);
    this.map.setView([settings.center[0], settings.center[1]], zoom);

    leaflet
    .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
      attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
    })
    .addTo(this.map);

    offers.map((item) => {
      const offerCoords = [item.location.latitude, item.location.longitude];
      if (item.id === activeCard.id) {
        leaflet.marker(offerCoords, {icon: orangeIcon}).addTo(this.map);
      } else {
        leaflet.marker(offerCoords, {icon}).addTo(this.map);
      }
    });
  }
}

Map.propTypes = {
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
  city: PropTypes.object.isRequired,
  leaflet: PropTypes.object.isRequired,
  activeCard: PropTypes.object.isRequired,
  className: PropTypes.string,
};

export default Map;
