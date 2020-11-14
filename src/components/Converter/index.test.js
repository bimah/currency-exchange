import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react';
import { ExchangeProvider } from '../../utils/exchange-context';

import Converter from './index';

import UserData from '../../../settings/user-details.json';
import CurrenciesRates from '../../utils/__mocks__/mock-rates.json';
import Currency from '../../utils/currency';

const { general, accounts } = UserData;

jest.mock('../../utils/request');

test('Converter to render correctly', async () => {
  const { getByText } = render(
    <ExchangeProvider>
      <Converter />
    </ExchangeProvider>
  );
  await waitFor(() => expect(getByText('Exchange')));
});

test('Coverter Cta to be disabled by default', async () => {
  const { getByText } = render(
    <ExchangeProvider>
      <Converter />
    </ExchangeProvider>
  );
  await waitFor(() => expect(getByText('Exchange').disabled).toBe(true));
});

test('Coverter Cta to be enabled if value', async () => {
  const { getByText, getAllByTestId } = render(
    <ExchangeProvider>
      <Converter />
    </ExchangeProvider>
  );
  const inputs = getAllByTestId('display-input');
  fireEvent.change(inputs[0], { target: { value: 1 } });
  await waitFor(() => expect(getByText('Exchange').disabled).toBe(false));
});

test('Currency cta to trigger onCurrencyChange', async () => {
  const handleCurrencyChange = jest.fn();
  const { getAllByTestId } = render(
    <ExchangeProvider>
      <Converter onCurrencyChange={handleCurrencyChange} />
    </ExchangeProvider>
  );
  const buttons = getAllByTestId('button');
  const currencyButtons = buttons.filter(btn => btn.classList.contains('btn--currency'));
  fireEvent.click(currencyButtons[0]);
  await waitFor(() => expect(handleCurrencyChange).toHaveBeenCalledTimes(1));
});

test('Toggle button to switch currencies', async () => {
  const { getAllByTestId } = render(
    <ExchangeProvider>
      <Converter />
    </ExchangeProvider>
  );
  const buttons = getAllByTestId('button');
  const currencyButtons = buttons.filter(btn => btn.classList.contains('btn--currency'));
  const fromCurrency = currencyButtons[0].innerHTML;
  const toCurrency = currencyButtons[1].innerHTML;
  const [toggleCta] = buttons.filter(btn => btn.classList.contains('btn--toggle'));
  fireEvent.click(toggleCta);
  await waitFor(() => expect(currencyButtons[0].innerHTML).toBe(toCurrency));
  expect(currencyButtons[1].innerHTML).toBe(fromCurrency);
});

test('Exchange cta to move money between pockets', async () => {
  const { getAllByTestId, getByText } = render(
    <ExchangeProvider>
      <Converter />
    </ExchangeProvider>
  );
  const inputs = getAllByTestId('display-input');
  fireEvent.change(inputs[0], { target: { value: 1 } });
  const [defaultAccount] = accounts.filter(acc => acc.currency === general.defaultCurrency);
  const defaultFormattedBalance = defaultAccount.balance;
  await waitFor(() => expect(getByText(`Balance: ${Currency.format(general.language, defaultAccount.currency.toLowerCase(), defaultFormattedBalance)}`)));
  fireEvent.click(getByText('Exchange'));
  expect(getByText(`Balance: ${Currency.format(general.language, defaultAccount.currency.toLowerCase(), defaultFormattedBalance - 1)}`));
});

test('Covert currency on type from to to', async () => {
  const { getAllByTestId } = render(
    <ExchangeProvider>
      <Converter />
    </ExchangeProvider>
  );
  const buttons = getAllByTestId('button');
  const inputs = getAllByTestId('display-input');
  const currencyButtons = buttons.filter(btn => btn.classList.contains('btn--currency'));
  fireEvent.change(inputs[0], { target: { value: 1 } });
  const toCurrency = currencyButtons[1].innerHTML;
  const rate = CurrenciesRates.rates[toCurrency];
  await waitFor(() => expect(inputs[1].value).toBe(`+ ${parseFloat(Currency.sortDecimal(1 * rate, 2))}`));
});
