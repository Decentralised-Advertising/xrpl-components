import type * as xrpl from 'xrpl';

export function resolveXRPL(): typeof xrpl {
  if ((window as any)?.xrpl) {
    return (window as any).xrpl;
  }
  throw new Error(
    'xrpl not available on the window, did you forget to include it from the CDN?'
  );
}

export function resolveXRPLClient(): typeof xrpl.Client {
  try {
    const xrpl = resolveXRPL();
    return xrpl.Client;
  } catch {
    throw new Error(
      'xrpl Client is not available, did you forget to include it from the CDN?'
    );
  }
}
