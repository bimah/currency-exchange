import React from 'react';
import styles from './main.scss';

import Widget from '../Widget';
import CurrencyExchange from '../CurrencyExchange';
import Flag from '../Flag';
import Pocket from '../Pocket';

import userData from '../../../settings/user-details.json';

const App = () => (
  <div className={styles.app}>
    <Widget title="Exchange">
      <CurrencyExchange userData={userData} />
    </Widget>
    <Flag currencyCode="USD" />
    <Pocket currencyCode="GBP" currencyName="British Pound Sterling" />
  </div>
);

export default App;
