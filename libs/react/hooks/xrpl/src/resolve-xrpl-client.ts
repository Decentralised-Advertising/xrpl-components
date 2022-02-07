import type { Client } from 'xrpl';

export function resolveXRPLClient(): typeof Client {
  if ((window as any)?.xrpl?.Client) {
    return (window as any).xrpl.Client;
  }
  throw new Error('xrpl not defined');
}
