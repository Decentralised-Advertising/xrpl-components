import { render } from '@testing-library/react';

import { AccountBalance } from './account-balance';

describe('AccountBalance', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AccountBalance />);
    expect(baseElement).toBeTruthy();
  });
});
