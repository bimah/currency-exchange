import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useEffect,
  useState,
  FunctionComponent,
  Context,
  Provider
} from 'react';

import UserData from '../../settings/user-details.json';
import Currencies from '../../settings/currencies.json';
import Request from './request';

const { accounts, general } = UserData;

type Account = {
  currency: string,
  balance: number
};

type State = {
  accounts: Account[],
  language: string
  fromAccount: Account,
  toAccount: Account,
  rate: number,
  availableCurrencies: Record<string, string >
};

type Action = {
  type: string,
  payload?: Record<string, any>
};

const ExchangeStateContext = createContext({});
const ExchangeDispatchContext = createContext({});

// TODO Set toAccount to first available currency if no accounts
const initialState: State = {
  accounts,
  language: general.language,
  fromAccount: accounts.filter(
    account => account.currency === general.defaultCurrency
  )[0],
  toAccount: accounts.filter(
    account => account.currency !== general.defaultCurrency
  )[0],
  rate: null,
  availableCurrencies: Currencies
};

const ExchangeReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'toggle': {
      return { ...state, ...{ fromAccount: state.toAccount, toAccount: state.fromAccount } };
    }
    case 'updateAccounts': {
      const { transfers } = action.payload;
      let newAccounts = state.accounts;
      transfers.forEach(transfer => {
        if (newAccounts.filter(acc => acc.currency === transfer.currency).length === 0) {
          newAccounts.push({ currency: transfer.currency, balance: 0 });
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
      return { ...state, ...{ rate: action.payload.rate } };
    }
    case 'updateAccount': {
      const { account, currency } = action.payload;
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

const ExchangeProvider:FunctionComponent = ({ children }) => {
  const [state, dispatch] = useReducer(ExchangeReducer, initialState);
  const [callback, setCallback] = useState(null);

  const getRate = async (currency: string) => {
    const currentRate = await Request.get('https://api.exchangeratesapi.io/latest', { base: currency });
    return currentRate;
  };

  const onReloadRate = useCallback(async (from: string, to: string) => {
    const rateData = await getRate(from);
    dispatch({
      type: 'updateRate',
      payload: {
        rate: rateData.rates[to]
      }
    });
  }, []);

  useEffect(() => {
    if (callback) clearInterval(callback);
    onReloadRate(
      state.fromAccount.currency,
      state.toAccount.currency
    );
    setCallback(setInterval(() => onReloadRate(
      state.fromAccount.currency,
      state.toAccount.currency
    ), 10000));
  }, [state.fromAccount.currency]);

  return (
    <ExchangeStateContext.Provider value={state}>
      <ExchangeDispatchContext.Provider value={dispatch}>
        {children}
      </ExchangeDispatchContext.Provider>
    </ExchangeStateContext.Provider>
  );
};

ExchangeProvider.defaultProps = {
  children: null
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
