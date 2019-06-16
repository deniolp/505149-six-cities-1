import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {Operation} from '../../reducer/data/data';
import {getReviews} from '../../reducer/data/selectors';
import Review from '../review/review';
import SendReviewForm from '../send-review-form/send-review-form';

class ReviewList extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {id, onLoadReviews} = this.props;

    onLoadReviews(id);
  }

  render() {
    const {reviews} = this.props;

    return <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ul className="reviews__list">
        {this._getReviews(reviews)}
      </ul>
      <SendReviewForm />
    </section>;
  }

  _getReviews(reviews) {
    return reviews.map((item) => {
      return <Review
        key={`Review-${item.id}`}
        review={item}
      />;
    });
  }
}

ReviewList.propTypes = {
  reviews: PropTypes.array.isRequired,
  id: PropTypes.number.isRequired,
  onLoadReviews: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  reviews: getReviews(state),
});

const mapDispatchToProps = (dispatch) => ({
  onLoadReviews: (id) => dispatch(Operation.loadReviews(id)),
});

export {ReviewList};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewList);
