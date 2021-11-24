import { render } from '@testing-library/react';

import ComponentsAccountBalance from './components-account-balance';

describe('ComponentsAccountBalance', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ComponentsAccountBalance />);
    expect(baseElement).toBeTruthy();
  });
});
