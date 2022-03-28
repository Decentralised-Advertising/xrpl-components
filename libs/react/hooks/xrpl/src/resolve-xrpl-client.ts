import type * as xrpl from 'xrpl';

export type XRPL = typeof xrpl;

export function resolveXRPL(): XRPL {
  if ((window as any)?.xrpl) {
    return (window as any).xrpl;
  }
  throw new Error(
    'xrpl not available on the window, did you forget to include it from the CDN?'
  );
}

export function resolveXRPLClient(): XRPL['Client'] {
  try {
    const xrpl = resolveXRPL();
    return xrpl.Client;
  } catch {
    throw new Error(
      'xrpl Client is not available, did you forget to include it from the CDN?'
    );
  }
}
