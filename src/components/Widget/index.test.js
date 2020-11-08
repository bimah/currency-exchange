import React from 'react';
import { render } from '@testing-library/react';

import Widget from './index';

test('Widget to render correctly', () => {
  const { getByText } = render(
    <Widget title="widget title">
      <p>content</p>
    </Widget>
  );
  expect(getByText('widget title'));
  expect(getByText('content'));
});
