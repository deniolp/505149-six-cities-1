import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const Place = (props) => {
  const {place, onMouseEnter, onMouseLeave, setHighlightedItem, active} = props;

  return <article className={`cities__place-card place-card ${active ? `cities__place-card--active` : ``}`}>
    {
      place.isPremium ? <div className="place-card__mark">
        <span>Premium</span>
      </div> : null
    }
    <div className="cities__image-wrapper place-card__image-wrapper" onClick={() => setHighlightedItem(place.id)}>
      <a href="#">
        <img className="place-card__image" src={place.previewImage} width="260" height="200" alt="Place image" onMouseEnter={() => onMouseEnter(place)} onMouseLeave={() => onMouseLeave()}/>
      </a>
    </div>
    <div className="place-card__info">
      <div className="place-card__price-wrapper">
        <div className="place-card__price">
          <b className="place-card__price-value">&euro;{place.price}</b>
          <span className="place-card__price-text">&#47;&nbsp;night</span>
        </div>
        <button className={place.isFavorite ? `place-card__bookmark-button place-card__bookmark-button--active button` : `place-card__bookmark-button button`} type="button">
          <svg className="place-card__bookmark-icon" width="18" height="19">
            <use xlinkHref="#icon-bookmark"/>
          </svg>
          <span className="visually-hidden">To bookmarks</span>
        </button>
      </div>
      <div className="place-card__rating rating">
        <div className="place-card__stars rating__stars">
          <span style={{width: `${(place.rating * 100) / 5}%`}}></span>
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <h2 className="place-card__name">
        <Link to={`/offer/${place.id}`}>{place.title}</Link>
      </h2>
      <p className="place-card__type">{place.type}</p>
    </div>
  </article>;
};

Place.propTypes = {
  place: PropTypes.shape({
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
  }).isRequired,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  setHighlightedItem: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
};

export default Place;
