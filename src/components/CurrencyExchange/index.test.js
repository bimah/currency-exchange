import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react';

import CurrencyExchange from './index';

jest.mock('../../utils/request');

test('CurrencyExchange to render correctly', async () => {
  const { getByTestId } = render(
    <CurrencyExchange />
  );
  await waitFor(() => expect(getByTestId('currency-exchange')));
});

test('Open overlay on currency display click', async () => {
  const { getAllByTestId, getByTestId } = render(
    <CurrencyExchange />
  );
  const buttons = getAllByTestId('button');
  const overlay = getByTestId('overlay');
  const currencyButtons = buttons.filter(btn => btn.classList.contains('btn--currency'));
  fireEvent.click(currencyButtons[0]);
  await waitFor(() => expect(overlay.classList.contains('currencies-overlay--open')));
});

test('Close overlay', async () => {
  const { getAllByTestId, getByTestId } = render(
    <CurrencyExchange />
  );
  const buttons = getAllByTestId('button');
  const overlay = getByTestId('overlay');
  const currencyButtons = buttons.filter(btn => btn.classList.contains('btn--currency'));
  const [closeOverlayBtn] = buttons.filter(btn => btn.classList.contains('btn--close'));
  fireEvent.click(currencyButtons[0]);
  await waitFor(() => expect(overlay.classList.contains('currencies-overlay--open')).toBe(true));
  fireEvent.click(closeOverlayBtn);
  expect(overlay.classList.contains('currencies-overlay--open')).toBe(false);
});
