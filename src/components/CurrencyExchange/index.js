import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Converter from '../Converter';

import styles from './main.scss';

const CurrencyExchange = ({ userData }) => {
  const [userAccounts, setUserAccount] = useState(userData.accounts);
  const [fromAccount, setFromAccount] = useState(userAccounts.filter(
    account => account.currency === userData.general.defaultCurrency
  )[0]);
  const [toAccount, setToAccount] = useState(userAccounts.filter(
    account => account.currency !== userData.general.defaultCurrency
  )[0]);

  return (
    <div className={styles['currency-exchange']}>
      <div className={styles['currency-exchange__main']}>
        <Converter pocketFrom={fromAccount} pocketTo={toAccount} rate={1.5} />
      </div>
      <div className={styles['currency-exchange__over']}>
        <p>over</p>
      </div>
    </div>
  );
};

CurrencyExchange.propTypes = {
  userData: PropTypes.shape({
    general: PropTypes.shape({
      language: PropTypes.string,
      defaultCurrency: PropTypes.string
    }),
    accounts: PropTypes.arrayOf(PropTypes.shape({
      currency: PropTypes.string,
      balance: PropTypes.number
    }))
  }).isRequired
};

export default CurrencyExchange;
