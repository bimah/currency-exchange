import React, { useState, useEffect, FunctionComponent } from 'react';

import { useExchangeState, useExchangeDispatch } from '../../utils/exchange-context';

import Button from '../Button';
import CurrencyDisplay from '../CurrencyDisplay';

import Currency from '../../utils/currency';

import styles from './main.scss';
import { number } from 'prop-types';

type ConverterProps = {
  onCurrencyChange: (arg0: string) => void
};

const Converter:FunctionComponent<ConverterProps>= ({ onCurrencyChange }) => {
  const {
    fromAccount,
    toAccount,
    rate,
    language
  } = useExchangeState();
  const dispatch = useExchangeDispatch();
  const [from, setFrom] = useState<number>(0);
  const [to, setTo] = useState<number>(0);

  const onInputChange = (value: string, add: boolean):void => {
    setFrom(add ? parseFloat(Currency.sortDecimal(Number(value) / rate, 2)) : Number(value));
    setTo(add ? Number(value) : parseFloat(Currency.sortDecimal(Number(value) * rate, 2)));
  };

  useEffect(() => {
    onInputChange(String(from), false);
  }, [rate]);

  const handleUpdateAccounts = () => {
    dispatch({
      type: 'updateAccounts',
      payload: {
        transfers: [
          {
            currency: fromAccount.currency,
            amount: Currency.posToNeg(from)
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

  const isExchangeBtnDisabled: boolean = !rate || from > fromAccount.balance || from === 0 || to === 0;

  return (
    <div>
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
        <Button label="Exchange" handleClick={handleUpdateAccounts} disabled={isExchangeBtnDisabled} />
      </div>
    </div>
  );
};

export default Converter;
