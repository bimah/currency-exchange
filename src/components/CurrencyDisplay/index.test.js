import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react';
import { ExchangeProvider } from '../../utils/exchange-context';

import CurrencyDisplay from './index';

jest.mock('../../utils/request');

const pocket = {
  currency: 'GBP',
  balance: 3
};

test('CurrencyDisplay to render correctly', async () => {
  const { getByText } = render(
    <ExchangeProvider>
      <CurrencyDisplay pocket={pocket} />
    </ExchangeProvider>
  );
  await waitFor(() => expect(getByText('Balance: £3.00')));
});

test('CurrencyDisplay to call change currency with righ param', async () => {
  const handleCurrencyChange = jest.fn();
  const { getByTestId } = render(
    <ExchangeProvider>
      <CurrencyDisplay pocket={pocket} handleCurrencyChange={handleCurrencyChange} />
    </ExchangeProvider>
  );
  fireEvent.click(getByTestId('button'));
  await waitFor(() => expect(handleCurrencyChange).toHaveBeenCalledWith('to'));
});

test('CurrencyDisplay to call change currency with righ param', async () => {
  const handleCurrencyChange = jest.fn();
  const { getByTestId } = render(
    <ExchangeProvider>
      <CurrencyDisplay pocket={pocket} handleCurrencyChange={handleCurrencyChange} add={false} />
    </ExchangeProvider>
  );
  fireEvent.click(getByTestId('button'));
  await waitFor(() => expect(handleCurrencyChange).toHaveBeenCalledWith('from'));
});

test('CurrencyDisplay to add + before input value', async () => {
  const { getByTestId } = render(
    <ExchangeProvider>
      <CurrencyDisplay pocket={pocket} />
    </ExchangeProvider>
  );
  fireEvent.change(getByTestId('display-input'), { target: { value: 1 } });
  await waitFor(() => expect(getByTestId('display-input').value).toBe('+ 1'));
});

test('CurrencyDisplay to add - before input value', async () => {
  const { getByTestId } = render(
    <ExchangeProvider>
      <CurrencyDisplay pocket={pocket} add={false} />
    </ExchangeProvider>
  );
  fireEvent.change(getByTestId('display-input'), { target: { value: 1 } });
  await waitFor(() => expect(getByTestId('display-input').value).toBe('- 1'));
});

test('CurrencyDisplay to show amount', async () => {
  const { getByTestId } = render(
    <ExchangeProvider>
      <CurrencyDisplay pocket={pocket} add={false} amount={2} />
    </ExchangeProvider>
  );
  await waitFor(() => expect(getByTestId('display-input').value).toBe('- 2'));
});

test('CurrencyDisplay input to not acept letters', async () => {
  const { getByTestId } = render(
    <ExchangeProvider>
      <CurrencyDisplay pocket={pocket} add={false} />
    </ExchangeProvider>
  );
  fireEvent.change(getByTestId('display-input'), { target: { value: 'a' } });
  await waitFor(() => expect(getByTestId('display-input').value).toBe(''));
});

test('CurrencyDisplay input to acept 2 decimals', async () => {
  const { getByTestId } = render(
    <ExchangeProvider>
      <CurrencyDisplay pocket={pocket} add={false} />
    </ExchangeProvider>
  );
  const displayInput = getByTestId('display-input');
  fireEvent.change(displayInput, { target: { value: '1' } });
  fireEvent.change(displayInput, { target: { value: '1.' } });
  fireEvent.change(displayInput, { target: { value: '1.1' } });
  fireEvent.change(displayInput, { target: { value: '1.11' } });
  fireEvent.change(displayInput, { target: { value: '1.111' } });
  await waitFor(() => expect(getByTestId('display-input').value).toBe('- 1.11'));
});

test('CurrencyDisplay input to call inputChange on change', async () => {
  const onChange = jest.fn();
  const { getByTestId } = render(
    <ExchangeProvider>
      <CurrencyDisplay pocket={pocket} add={false} handleInputChange={onChange} />
    </ExchangeProvider>
  );
  fireEvent.change(getByTestId('display-input'), { target: { value: '1' } });
  await waitFor(() => expect(onChange).toHaveBeenCalledTimes(1));
});

test('CurrencyDisplay to show over balance', async () => {
  const { getByTestId, getByText } = render(
    <ExchangeProvider>
      <CurrencyDisplay pocket={pocket} add={false} />
    </ExchangeProvider>
  );
  const displayInput = getByTestId('display-input');
  fireEvent.change(displayInput, { target: { value: '5' } });
  await waitFor(() => expect(getByText('exceed balance')));
  expect(displayInput.classList.contains('currency-input--over'));
});
