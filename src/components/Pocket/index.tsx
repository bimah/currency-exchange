import React, { FunctionComponent } from 'react';

import styles from './main.scss';

import Flag from '../Flag';

type PocketProps = {
  currencyCode: string,
  amount: number,
  currencyName: string,
  handleCurrencyClick: (arg0: string) => void,
  disabled: boolean
};

const Pocket:FunctionComponent<PocketProps> = ({
  currencyCode,
  amount,
  currencyName,
  handleCurrencyClick,
  disabled
}) => (
  <button type="button" className={styles.pocket} onClick={() => handleCurrencyClick(currencyCode)} disabled={disabled} data-testid="pocket">
    <div className={styles['pocket--flag']}>
      <Flag currencyCode={currencyCode} />
    </div>
    <div className={styles['pocket--details']}>
      <p className="label1">{`${currencyCode} - ${amount.toFixed(2)}`}</p>
      <p>{currencyName}</p>
    </div>
  </button>
);

Pocket.defaultProps = {
  amount: 0,
  disabled: false
};

export default Pocket;
