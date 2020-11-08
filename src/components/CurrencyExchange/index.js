import React from 'react';
import { ExchangeProvider } from '../../utils/exchange-context';

import Converter from '../Converter';

import styles from './main.scss';

const CurrencyExchange = () => (
  <ExchangeProvider>
    <div className={styles['currency-exchange']}>
      <div className={styles['currency-exchange__main']}>
        <Converter />
        {/* pocketFrom={fromAccount} pocketTo={toAccount} rate={1.5} /> */}
      </div>
      <div className={styles['currency-exchange__over']}>
        <p>over</p>
      </div>
    </div>
  </ExchangeProvider>
);

export default CurrencyExchange;
