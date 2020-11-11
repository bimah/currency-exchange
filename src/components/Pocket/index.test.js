import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Pocket from './index';

test('Pocket to render correctly', () => {
  const { getByText } = render(
    <Pocket currencyCode="GBP" currencyName="British Pound Sterling" />
  );
  expect(getByText('British Pound Sterling'));
  expect(getByText('GBP - 0.00'));
});

test('Pocket to show correct amount', () => {
  const { getByText } = render(
    <Pocket
      currencyCode="GBP"
      currencyName="British Pound Sterling"
      amount={45}
    />
  );
  expect(getByText('GBP - 45.00'));
});

test('Pocket to show correct amount', () => {
  const { getByTestId } = render(
    <Pocket
      currencyCode="GBP"
      currencyName="British Pound Sterling"
      disabled
    />
  );
  expect(getByTestId('pocket').disabled).toBe(true);
});

test('Pocket to call handleCurrencyClick()', () => {
  const handleCurrencyClick = jest.fn();
  const { getByTestId } = render(
    <Pocket
      currencyCode="GBP"
      currencyName="British Pound Sterling"
      handleCurrencyClick={handleCurrencyClick}
    />
  );
  fireEvent.click(getByTestId('pocket'));
  expect(handleCurrencyClick).toHaveBeenCalledTimes(1);
});
