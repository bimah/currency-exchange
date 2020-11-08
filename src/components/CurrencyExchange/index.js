import React, { useState } from 'react';
import { ExchangeProvider } from '../../utils/exchange-context';

import Converter from '../Converter';
import CurrenciesOverlay from '../CurrenciesOverlay';

import styles from './main.scss';

const CurrencyExchange = () => {
  const [openOverlay, setOpenOverlay] = useState(true);
  return (
    <ExchangeProvider>
      <div className={styles['currency-exchange']}>
        <div className={styles['currency-exchange__main']}>
          <Converter />
        </div>
        <CurrenciesOverlay title="Choose currency" isOpen={openOverlay} onClose={() => setOpenOverlay(false)} />
      </div>
    </ExchangeProvider>
  );
};

export default CurrencyExchange;
