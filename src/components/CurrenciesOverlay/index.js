import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import { useExchangeState } from '../../utils/exchange-context';
import Currency from '../../../settings/currencies.json';

import Button from '../Button';
import Pocket from '../Pocket';

import styles from './main.scss';

const cx = classNames.bind(styles);

const CurrenciesOverlay = ({
  title,
  isOpen,
  onClose
}) => {
  const { accounts } = useExchangeState();
  const otherPockets = (existing, fullList) => {
    const existingIds = existing.map(ex => ex.currency);
    const filteredList = { ...fullList };
    existingIds.forEach(id => delete filteredList[id]);
    return filteredList;
  };
  return (
    <div className={cx('currencies-overlay', { 'currencies-overlay--open': isOpen })}>
      <div className={styles['currencies-overlay__header']}>
        { title && <h2>{title}</h2>}
        <div className={styles['currencies-overlay__header--close']}>
          <Button btnStyle="close" handleClick={onClose} />
        </div>
      </div>
      <div className={styles['currencies-overlay__content']}>
        <div className={styles['currencies-overlay__content-recent']}>
          <h3>Recently used</h3>
          <ul>
            {accounts.map(account => (
              <li key={account.currency}>
                <Pocket
                  currencyCode={account.currency}
                  amount={account.balance}
                  currencyName={Currency[account.currency]}
                />
              </li>
            ))}
          </ul>
        </div>
        <div className={styles['currencies-overlay__content-other']}>
          <h3>Other</h3>
          <ul>
            {
              Object.entries(otherPockets(accounts, Currency)).map(([key, value]) => (
                <li key={key}>
                  <Pocket
                    currencyCode={key}
                    amount={0}
                    currencyName={value}
                  />
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </div>
  );
};

CurrenciesOverlay.propTypes = {
  title: PropTypes.string,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func
};

CurrenciesOverlay.defaultProps = {
  title: null,
  isOpen: false,
  onClose: () => {}
};

export default CurrenciesOverlay;
