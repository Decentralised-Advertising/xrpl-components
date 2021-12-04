import { render } from '@testing-library/react';

import { XRPLContextProvider } from './xrpl-context-provider';

describe('ComponentsXrplContextProvider', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <XRPLContextProvider>any</XRPLContextProvider>
    );
    expect(baseElement).toBeTruthy();
  });
});
