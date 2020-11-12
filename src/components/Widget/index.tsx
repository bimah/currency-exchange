import React, { FunctionComponent } from 'react';

import styles from './main.scss';

type WidgetProps = {
  title: string,
}

const Widget:FunctionComponent<WidgetProps> = ({ title, children }) => (
  <div className={styles.widget}>
    <div className={styles.widget__title}>
      <h1>{title}</h1>
    </div>
    <div>
      { children }
    </div>
  </div>
);

export default Widget;
