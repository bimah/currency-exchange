import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react';
import { ExchangeProvider } from '../../utils/exchange-context';

import CurrenciesOverlay from './index';

jest.mock('../../utils/request');

test('CurrenciesOverlay to render correctly', async () => {
  const { getByText, getByTestId } = render(
    <ExchangeProvider>
      <CurrenciesOverlay title="test overlay" />
    </ExchangeProvider>
  );
  await waitFor(() => expect(getByText('test overlay')));
  expect(getByTestId('overlay').classList.contains('currencies-overlay--open')).toBe(false);
});

test('CurrenciesOverlay to open', async () => {
  const { getByTestId } = render(
    <ExchangeProvider>
      <CurrenciesOverlay title="test overlay" isOpen />
    </ExchangeProvider>
  );
  await waitFor(() => expect(getByTestId('overlay').classList.contains('currencies-overlay--open')).toBe(true));
});

test('CurrencyOverlay to trigger close', async () => {
  const handleOnClose = jest.fn();
  const { getByTestId } = render(
    <ExchangeProvider>
      <CurrenciesOverlay title="test overlay" isOpen onClose={handleOnClose} />
    </ExchangeProvider>
  );
  const closeBtn = getByTestId('button');
  fireEvent.click(closeBtn);
  await waitFor(() => expect(handleOnClose).toHaveBeenCalledTimes(1));
});

test('CurrenciesOverlay to render all currencies', async () => {
  const { getAllByTestId } = render(
    <ExchangeProvider>
      <CurrenciesOverlay title="test overlay" />
    </ExchangeProvider>
  );
  // Number of currencies on /settings/currencies.json
  await waitFor(() => expect(getAllByTestId('pocket')).toHaveLength(32));
});

test('CurrenciesOverlay to have same currency disabled', async () => {
  const { getByText } = render(
    <ExchangeProvider>
      <CurrenciesOverlay title="test overlay" accountType="to" />
    </ExchangeProvider>
  );
  await waitFor(() => expect(getByText('British Pound Sterling').closest('button').disabled).toBeTruthy());
});

test('CurrenciesOverlay to close on selection', async () => {
  const { getByText, getByTestId } = render(
    <ExchangeProvider>
      <CurrenciesOverlay title="test overlay" accountType="to" />
    </ExchangeProvider>
  );
  fireEvent.click(getByText('Swiss Franc').closest('button'));
  await waitFor(() => expect(getByTestId('overlay').classList.contains('currencies-overlay--open')).toBe(false));
});
