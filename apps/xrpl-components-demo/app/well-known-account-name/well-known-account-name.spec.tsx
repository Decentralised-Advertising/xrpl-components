import { render } from '@testing-library/react';

import WellKnownAccountName from './well-known-account-name';

describe('WellKnownAccountName', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WellKnownAccountName />);
    expect(baseElement).toBeTruthy();
  });
});
