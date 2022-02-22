import { resolveXRPL } from './resolve-xrpl-client';

export function useXRPLGlobal() {
  const xrpl = resolveXRPL();
  return {
    xrpl,
  };
}
