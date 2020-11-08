import React, { useState } from 'react';

import { useExchangeState, useExchangeDispatch } from '../../utils/exchange-context';

import Button from '../Button';
import CurrencyDisplay from '../CurrencyDisplay';

import Currency from '../../utils/currency';

import styles from './main.scss';

const Converter = () => {
  const {
    fromAccount,
    toAccount,
    rate,
    language
  } = useExchangeState();
  const dispatch = useExchangeDispatch();
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(0);

  const onInputChange = (value, add) => (
    add
      ? setFrom(parseFloat(Currency.sortDecimal(value / rate, 2)))
      : setTo(parseFloat(Currency.sortDecimal(value * rate, 2))));

  return (
    <div className={styles.converter}>
      <div className={styles['converter--content']}>
        <div className={styles['converter--content__from']}>
          <CurrencyDisplay
            pocket={fromAccount}
            add={false}
            handleInputChange={onInputChange}
            amount={from}
          />
        </div>
        <div className={styles['converter--content__additional']}>
          <div className={styles['converter--content__additional--toggle']}>
            <Button btnStyle="toggle" handleClick={() => dispatch({ type: 'toggle' })} />
          </div>
          <Button btnStyle="display" label={`${Currency.format(language, fromAccount.currency, 1)} = ${Currency.format(language, toAccount.currency, 1 * rate)}`} />
        </div>
        <div className={styles['converter--content__to']}>
          <CurrencyDisplay pocket={toAccount} handleInputChange={onInputChange} amount={to} />
        </div>
      </div>
      <div className={styles['converter--content__action']}>
        <Button label="Exchange" />
      </div>
    </div>
  );
};

export default Converter;
