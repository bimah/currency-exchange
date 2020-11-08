import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import Button from './index';

const label = 'test label';

test('Button should render correctly', () => {
  const { getByText, getByTestId } = render(
    <Button label={label} />
  );
  expect(getByText(label));
  expect(getByTestId('button').classList.contains('btn--primary'));
});

test('Button action to fire correctly', () => {
  const handleClick = jest.fn();
  const { getByTestId } = render(
    <Button label={label} handleClick={handleClick} />
  );
  fireEvent.click(getByTestId('button'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});

test('Button to render style correctly', () => {
  const { getByTestId } = render(
    <Button label={label} btnStyle="currency" />
  );
  expect(getByTestId('button').classList.contains('btn--currency'));
});

test('Disable Button', () => {
  const { getByTestId } = render(
    <Button disabled label={label} />
  );
  expect(getByTestId('button').disabled).toBeTruthy();
});
