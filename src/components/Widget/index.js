import React from 'react';
import PropTypes from 'prop-types';

import styles from './main.scss';

const Widget = ({ title, children }) => (
  <div className={styles.widget}>
    <div className={styles.widget__title}>
      <h1>{title}</h1>
    </div>
    <div className={styles.widget__content}>
      { children }
    </div>
  </div>
);

Widget.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default Widget;
