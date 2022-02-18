import type { Client } from 'xrpl';

export function resolveXRPL(): { Client: typeof Client } {
  if ((window as any)?.xrpl?.Client) {
    return (window as any).xrpl;
  }
  throw new Error('xrpl not defined');
}
