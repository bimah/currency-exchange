import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useEffect
} from 'react';
import PropTypes from 'prop-types';

import UserData from '../../settings/user-details.json';
import Request from './requst';

const { accounts, general } = UserData;

const ExchangeStateContext = createContext();
const ExchangeDispatchContext = createContext();

// TODO Set toAccount to first available currency if no accounts
const initialState = {
  accounts,
  language: general.language,
  fromAccount: accounts.filter(
    account => account.currency === general.defaultCurrency
  )[0],
  toAccount: accounts.filter(
    account => account.currency !== general.defaultCurrency
  )[0],
  rate: null
};

const ExchangeReducer = (state, action) => {
  switch (action.type) {
    case 'toggle': {
      return { ...state, ...{ fromAccount: state.toAccount, toAccount: state.fromAccount } };
    }
    case 'updateAccounts': {
      const { transfers } = action.data;
      let newAccounts = state.accounts;
      transfers.forEach(transfer => {
        if (newAccounts.filter(acc => acc.currency === transfer.currency).length === 0) {
          newAccounts.push({ currency: transfer.currency, balance: transfer.amount });
        }
        newAccounts = newAccounts.map(acc => {
          const updatedBalance = acc.currency === transfer.currency
            ? acc.balance += transfer.amount
            : acc.balance;
          return {
            currency: acc.currency,
            balance: updatedBalance
          };
        });
      });

      return {
        ...state,
        ...{
          accounts: newAccounts,
          fromAccount: newAccounts.filter(
            account => account.currency === state.fromAccount.currency
          )[0],
          toAccount: newAccounts.filter(
            account => account.currency === state.toAccount.currency
          )[0],
        }
      };
    }
    case 'updateRate': {
      return { ...state, ...{ rate: action.data } };
    }
    case 'updateAccount': {
      const { account, currency } = action.data;
      const [selectedAccount] = state.accounts.filter(acc => acc.currency === currency);
      const pocket = selectedAccount || { currency, balance: 0 };
      if (account === 'to') {
        return { ...state, ...{ toAccount: pocket } };
      }
      return { ...state, ...{ fromAccount: pocket } };
    }
    default:
      throw new Error(`Unhandles action type: ${action.type}`);
  }
};

const ExchangeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ExchangeReducer, initialState);

  const getRate = async currency => {
    const currentRate = await Request.get('https://api.exchangeratesapi.io/latest', { base: currency })
      .catch(error => console.log(error));
    return currentRate;
  };

  const onReloadRate = useCallback(async (from, to) => {
    const rateData = await getRate(from);
    dispatch({
      type: 'updateRate',
      data: rateData.rates[to]
    });
  }, []);

  useEffect(() => {
    onReloadRate(state.fromAccount.currency, state.toAccount.currency);
  }, [state.fromAccount.currency]);

  return (
    <ExchangeStateContext.Provider value={state}>
      <ExchangeDispatchContext.Provider value={dispatch}>
        {children}
      </ExchangeDispatchContext.Provider>
    </ExchangeStateContext.Provider>
  );
};

ExchangeProvider.propTypes = {
  children: PropTypes.node.isRequired
};

const useExchangeState = () => {
  const context = useContext(ExchangeStateContext);
  if (context === undefined) {
    throw new Error('useExchangeState must be use within a ExchangeProvider');
  }
  return context;
};

const useExchangeDispatch = () => {
  const context = useContext(ExchangeDispatchContext);
  if (context === undefined) {
    throw new Error('useExchangeDispatch must be use within a ExchangeProvider');
  }
  return context;
};

export { ExchangeProvider, useExchangeState, useExchangeDispatch };
