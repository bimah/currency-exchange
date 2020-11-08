import React from 'react';
import PropTypes from 'prop-types';

import styles from './main.scss';

const Flag = ({ currencyCode }) => (
  <div className={styles.flag}>
    <img src={`../../../images/currency-flags/${currencyCode.toLowerCase()}.svg`} alt={`Currency flag for ${currencyCode}`} />
  </div>
);

Flag.propTypes = {
  currencyCode: PropTypes.string.isRequired
};

export default Flag;
