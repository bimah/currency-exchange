import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useExchangeState, useExchangeDispatch } from '../../utils/exchange-context';

import Button from '../Button';
import CurrencyDisplay from '../CurrencyDisplay';

import Currency from '../../utils/currency';

import styles from './main.scss';

const Converter = ({ onCurrencyChange }) => {
  const {
    fromAccount,
    toAccount,
    rate,
    language
  } = useExchangeState();
  const dispatch = useExchangeDispatch();
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(0);

  const onInputChange = (value, add) => {
    if (add) {
      setFrom(parseFloat(Currency.sortDecimal(value / rate, 2)));
      setTo(parseFloat(value));
    } else {
      setTo(parseFloat(Currency.sortDecimal(value * rate, 2)));
      setFrom(parseFloat(value));
    }
  };

  useEffect(() => {
    onInputChange(from, false);
  }, [rate]);

  const posToNeg = num => -Math.abs(num);

  const handleUpdateAccounts = () => {
    dispatch({
      type: 'updateAccounts',
      payload: {
        transfers: [
          {
            currency: fromAccount.currency,
            amount: posToNeg(from)
          },
          {
            currency: toAccount.currency,
            amount: to
          }
        ]
      }
    });
    setFrom(0);
    setTo(0);
  };

  return (
    <div className={styles.converter}>
      <div className={styles['converter--content']}>
        <div className={styles['converter--content__from']}>
          <CurrencyDisplay
            pocket={fromAccount}
            add={false}
            handleInputChange={onInputChange}
            amount={from}
            handleCurrencyChange={onCurrencyChange}
          />
        </div>
        <div className={styles['converter--content__additional']}>
          <div className={styles['converter--content__additional--toggle']}>
            <Button btnStyle="toggle" handleClick={() => dispatch({ type: 'toggle' })} />
          </div>
          <Button btnStyle="display" label={`${Currency.format(language, fromAccount.currency, 1)} = ${Currency.format(language, toAccount.currency, 1 * rate)}`} />
        </div>
        <div className={styles['converter--content__to']}>
          <CurrencyDisplay
            pocket={toAccount}
            handleInputChange={onInputChange}
            amount={to}
            handleCurrencyChange={onCurrencyChange}
          />
        </div>
      </div>
      <div className={styles['converter--content__action']}>
        <Button label="Exchange" handleClick={handleUpdateAccounts} disabled={!rate || from > fromAccount.balance} />
      </div>
    </div>
  );
};

Converter.propTypes = {
  onCurrencyChange: PropTypes.func
};

Converter.defaultProps = {
  onCurrencyChange: () => {}
};

export default Converter;
