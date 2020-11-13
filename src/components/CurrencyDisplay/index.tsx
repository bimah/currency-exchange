import React, { useState, useEffect, FunctionComponent } from 'react';
import classNames from 'classnames/bind';
import { useExchangeState } from '../../utils/exchange-context';

import styles from './main.scss';
import Currency from '../../utils/currency';

import Button from '../Button';

const cx = classNames.bind(styles);

type PocketProps = {
  currency: string,
  balance: number
};

type CurrencyDisplayProps = {
  pocket: PocketProps
  add?: boolean,
  handleInputChange: (arg0: number, arg1: boolean) => void
  handleCurrencyChange: (arg0: string) => void,
  amount: number
};

const CurrencyDisplay:FunctionComponent<CurrencyDisplayProps> = ({
  pocket,
  add,
  handleInputChange,
  handleCurrencyChange,
  amount,
}) => {
  const { language } = useExchangeState();
  const [inputValue, setInputValue] = useState<string>(String(amount) || '');

  useEffect(() => {
    setInputValue(amount > 0 ? String(amount) : '');
  }, [amount]);

  const onInputChange = (event: React.ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    const formattedValue: number = Currency.restrictInputValue(target.value, inputValue);

    setInputValue(String(formattedValue));
    handleInputChange(formattedValue, add);
  };

  const prefix = add ? '+' : '-';
  const currencyInputValue = inputValue !== '' ? `${prefix} ${inputValue}` : inputValue;
  const overBalance = !add && parseFloat(inputValue) > pocket.balance;

  return (
    <div className={styles['currency-display']}>
      <div className={styles['currency-display__main']}>
        <div className={styles['currency-display__main-currency']}>
          <div>
            <Button label={pocket.currency} btnStyle="currency" handleClick={() => handleCurrencyChange(add ? 'to' : 'from')} />
            <p>{`Balance: ${Currency.format(language, pocket.currency, pocket.balance)}`}</p>
          </div>
          <div className={styles['currency-display__value']}>
            <input className={cx('currency-input', { 'currency-input--over': overBalance })} type="text" placeholder="0" value={currencyInputValue} onChange={onInputChange} aria-label="Amount" data-testid="display-input" />
            {overBalance ? <p className={styles['currency-display__value--over']}>exceed balance</p> : null}
          </div>
        </div>
      </div>
    </div>
  );
};

CurrencyDisplay.defaultProps = {
  add: true
};

export default CurrencyDisplay;
