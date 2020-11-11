import React from 'react';
import { render, waitFor } from '@testing-library/react';

import App from './index';

jest.mock('../../utils/request');

test('App to render correctly', async () => {
  const { getByTestId } = render(
    <App />
  );
  await waitFor(() => expect(getByTestId('app')));
});
