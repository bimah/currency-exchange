import { string } from 'prop-types';
import React, { useState, FunctionComponent } from 'react';
import { ExchangeProvider } from '../../utils/exchange-context';

import Converter from '../Converter';
import CurrenciesOverlay from '../CurrenciesOverlay';

import styles from './main.scss';

const CurrencyExchange:FunctionComponent = () => {
  const [openOverlay, setOpenOverlay] = useState<boolean>(false);
  const [account, setAccount] = useState<string>(null);
  const handleOpenOverlay = (acc: string) => {
    console.log(acc);
    setAccount(acc);
    setOpenOverlay(true);
  };
  return (
    <ExchangeProvider>
      <div className={styles['currency-exchange']} data-testid="currency-exchange">
        <div className={styles['currency-exchange__main']}>
          <Converter onCurrencyChange={handleOpenOverlay} />
        </div>
        <CurrenciesOverlay title="Choose currency" isOpen={openOverlay} accountType={account} onClose={() => setOpenOverlay(false)} />
      </div>
    </ExchangeProvider>
  );
};

export default CurrencyExchange;
