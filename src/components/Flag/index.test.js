import React from 'react';
import { render } from '@testing-library/react';

import Flag from './index';

test('Flag should render correctly', () => {
  const name = 'GBP';
  const { getByAltText } = render(
    <Flag currencyCode={name} />
  );
  expect(getByAltText(`Currency flag for ${name}`));
});
