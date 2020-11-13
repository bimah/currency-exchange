import React, { useMemo, FunctionComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import { useExchangeState, useExchangeDispatch } from '../../utils/exchange-context';

import Button from '../Button';
import Pocket from '../Pocket';

import styles from './main.scss';

const cx = classnames.bind(styles);

type CurrenciesOverlayProps = {
  title?: string,
  isOpen: boolean,
  onClose: () => void,
  accountType?: string
}

type AccountProps = {
  currency: string,
  balance: number
}

const CurrenciesOverlay:FunctionComponent<CurrenciesOverlayProps> = ({
  title,
  isOpen,
  onClose,
  accountType
}) => {
  const {
    accounts,
    toAccount,
    fromAccount,
    availableCurrencies
  } = useExchangeState();
  const dispatch = useExchangeDispatch();

  const otherPockets = useMemo(() => {
    const existingIds: string[] = accounts.map((ex: AccountProps) => ex.currency);
    const filteredList: Record<string, string> = { ...availableCurrencies };

    existingIds.forEach((id: string) => delete filteredList[id]);

    return filteredList;
  }, [accounts]);

  const changeAccount = (currency: string) => {
    dispatch({
      type: 'updateAccount',
      payload: {
        account: accountType,
        currency
      }
    });
    onClose();
  };

  const disableCurrency: string = accountType === 'to' ? fromAccount.currency : toAccount.currency;

  return (
    <div className={cx('currencies-overlay', { 'currencies-overlay--open': isOpen })} data-testid="overlay">
      <div className={styles['currencies-overlay__header']}>
        { title ? <h2>{title}</h2> : null}
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
                  currencyName={availableCurrencies[account.currency]}
                  handleCurrencyClick={changeAccount}
                  disabled={account.currency === disableCurrency}
                />
              </li>
            ))}
          </ul>
        </div>
        <div className={styles['currencies-overlay__content-other']}>
          <h3>Other</h3>
          <ul>
            {
              Object.entries(otherPockets).map(([key, value]) => (
                <li key={key}>
                  <Pocket
                    currencyCode={key}
                    amount={0}
                    currencyName={value}
                    handleCurrencyClick={changeAccount}
                    disabled={key === disableCurrency}
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

CurrenciesOverlay.defaultProps = {
  title: null,
  isOpen: false,
  accountType: null
};

export default CurrenciesOverlay;
