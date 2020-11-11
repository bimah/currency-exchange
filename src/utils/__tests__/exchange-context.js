import React, { useEffect } from 'react';
import { render } from '@testing-library/react';
import { useExchangeState, useExchangeDispatch } from '../exchange-context';

jest.mock('../request');

const TestExchangeState = () => {
  const {
    language,
  } = useExchangeState();

  return (<p>{language}</p>);
};

const TestExchangeDispatch = () => {
  const dispatch = useExchangeDispatch();

  useEffect(() => {
    dispatch({ type: 'toggle' });
  }, []);

  return (<p>test</p>);
};

test('ExchangeState outside ExchangeProvider to throw error', () => {
  const ExchangeState = () => render(<TestExchangeState />);
  expect(ExchangeState).toThrowError();
});

test('ExchangeDispatch outside ExchangeProvider to throw error', () => {
  const ExchangeDispatch = () => render(<TestExchangeDispatch />);
  expect(ExchangeDispatch).toThrowError();
});
