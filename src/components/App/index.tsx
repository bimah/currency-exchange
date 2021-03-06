import React, { FunctionComponent } from 'react';
import styles from './main.scss';

import Widget from '../Widget';
import CurrencyExchange from '../CurrencyExchange';

const App:FunctionComponent = () => (
  <div className={styles.app} data-testid="app">
    <Widget title="Exchange">
      <CurrencyExchange />
    </Widget>
  </div>
);

export default App;
