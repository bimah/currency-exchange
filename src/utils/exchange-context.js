/* eslint-disable react/prop-types */
import React from 'react';

import UserData from '../../settings/user-details.json';

const { accounts, general } = UserData;

const ExchangeStateContext = React.createContext();
const ExchangeDispatchContext = React.createContext();

const initialState = {
  accounts,
  language: general.language,
  fromAccount: accounts.filter(
    account => account.currency === general.defaultCurrency
  )[0],
  toAccount: accounts.filter(
    account => account.currency !== general.defaultCurrency
  )[0],
  rate: 1.5
};

const ExchangeReducer = (state, action) => {
  switch (action.type) {
    case 'toggle': {
      return { ...state, ...{ fromAccount: state.toAccount, toAccount: state.fromAccount } };
    }
    default:
      throw new Error(`Unhandles action type: ${action.type}`);
  }
};

const ExchangeProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(ExchangeReducer, initialState);
  return (
    <ExchangeStateContext.Provider value={state}>
      <ExchangeDispatchContext.Provider value={dispatch}>
        {children}
      </ExchangeDispatchContext.Provider>
    </ExchangeStateContext.Provider>
  );
};

const useExchangeState = () => {
  const context = React.useContext(ExchangeStateContext);
  if (context === undefined) {
    throw new Error('useExchangeState must be use within a ExchangeProvider');
  }
  return context;
};

const useExchangeDispatch = () => {
  const context = React.useContext(ExchangeDispatchContext);
  if (context === undefined) {
    throw new Error('useExchangeDispatch must be use within a ExchangeProvider');
  }
  return context;
};

export { ExchangeProvider, useExchangeState, useExchangeDispatch };
