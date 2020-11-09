import React from 'react';
import PropTypes from 'prop-types';

import styles from './main.scss';

import Flag from '../Flag';

const Pocket = ({ currencyCode, amount, currencyName }) => (
  <button type="button" className={styles.pocket}>
    <div className={styles['pocket--flag']}>
      <Flag currencyCode={currencyCode} />
    </div>
    <div className={styles['pocket--details']}>
      <p className="label1">{`${currencyCode} - ${amount.toFixed(2)}`}</p>
      <p>{currencyName}</p>
    </div>
  </button>
);

Pocket.propTypes = {
  currencyCode: PropTypes.string.isRequired,
  amount: PropTypes.number,
  currencyName: PropTypes.string.isRequired,
};

Pocket.defaultProps = {
  amount: 0
};

export default Pocket;
