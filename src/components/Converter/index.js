import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';
import CurrencyDisplay from '../CurrencyDisplay';

import Currency from '../../utils/currency';

import styles from './main.scss';

const Converter = ({ pocketFrom, pocketTo, rate }) => {
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(0);

  const onInputChange = (value, add) => (
    add
      ? setFrom(Currency.sortDecimal(value / rate, 2))
      : setTo(Currency.sortDecimal(value * rate, 2)));

  return (
    <div className={styles.converter}>
      <div className={styles['converter--content']}>
        <div className={styles['converter--content__from']}>
          <CurrencyDisplay
            pocket={pocketFrom}
            add={false}
            handleInputChange={onInputChange}
            amount={from}
          />
        </div>
        <div className={styles['converter--content__additional']}>
          <Button btnStyle="display" label={`${Currency.format('en', pocketFrom.currency, 1)} = ${Currency.format('en', pocketTo.currency, 1 * rate)}`} />
        </div>
        <div className={styles['converter--content__to']}>
          <CurrencyDisplay pocket={pocketTo} handleInputChange={onInputChange} amount={to} />
        </div>
      </div>
      <div className={styles.converter__action}>
        <Button label="Exchange" />
      </div>
    </div>
  );
};

Converter.propTypes = {
  pocketFrom: PropTypes.shape({
    currency: PropTypes.string,
    balance: PropTypes.string
  }).isRequired,
  pocketTo: PropTypes.shape({
    currency: PropTypes.string,
    balance: PropTypes.string
  }).isRequired,
  rate: PropTypes.number.isRequired
};

export default Converter;
