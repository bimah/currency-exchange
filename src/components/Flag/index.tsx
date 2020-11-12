import React, { FunctionComponent } from 'react';

import styles from './main.scss';

type FlagProps = {
  currencyCode: string
};

const Flag:FunctionComponent<FlagProps> = ({ currencyCode }) => (
  <div className={styles.flag}>
    <img src={`../../../images/currency-flags/${currencyCode.toLowerCase()}.svg`} alt={`Currency flag for ${currencyCode}`} />
  </div>
);

export default Flag;
