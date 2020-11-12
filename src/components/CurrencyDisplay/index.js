import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { useExchangeState } from '../../utils/exchange-context';

import styles from './main.scss';
import Currency from '../../utils/currency';

import Button from '../Button';

const cx = classNames.bind(styles);

const CurrencyDisplay = ({
  pocket,
  add,
  handleInputChange,
  handleCurrencyChange,
  amount,
}) => {
  const { language } = useExchangeState();
  const [inputValue, setInputValue] = useState(String(amount) || '');

  useEffect(() => {
    setInputValue(amount > 0 ? amount : '');
  }, [amount]);

  const onInputChange = event => {
    const { value } = event.target;
    const formattedValue = Currency.restrictInputValue(value, inputValue);

    setInputValue(formattedValue);
    handleInputChange(formattedValue, add);
  };

  const prefix = add ? '+' : '-';
  const currencyInputValue = inputValue !== '' ? `${prefix} ${inputValue}` : inputValue;
  const overBalance = !add && inputValue > pocket.balance;

  return (
    <div className={styles['currency-display']}>
      <div className={styles['currency-display__main']}>
        <div className={styles['currency-display__main-currency']}>
          <div>
            <Button label={pocket.currency} btnStyle="currency" handleClick={() => handleCurrencyChange(add ? 'to' : 'from')} />
            <p>{`Balance: ${Currency.format(language, pocket.currency, pocket.balance)}`}</p>
          </div>
          <div className={styles['currency-display__value']}>
            <input className={cx('currency-input', { 'currency-input--over': overBalance })} type="text" placeholder={0} value={currencyInputValue} onChange={onInputChange} aria-label="Amount" data-testid="display-input" />
            {overBalance ? <p className={styles['currency-display__value--over']}>exceed balance</p> : null}
          </div>
        </div>
      </div>
    </div>
  );
};

CurrencyDisplay.propTypes = {
  pocket: PropTypes.shape({
    currency: PropTypes.string,
    balance: PropTypes.number
  }).isRequired,
  add: PropTypes.bool,
  handleInputChange: PropTypes.func,
  handleCurrencyChange: PropTypes.func,
  amount: PropTypes.number,
};

CurrencyDisplay.defaultProps = {
  amount: null,
  add: true,
  handleInputChange: () => {},
  handleCurrencyChange: () => {},
};

export default CurrencyDisplay;
