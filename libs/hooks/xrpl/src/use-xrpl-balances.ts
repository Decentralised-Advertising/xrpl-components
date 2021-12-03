import useSWR from 'swr';
import type { LedgerIndex } from 'xrpl/dist/npm/models/common';
import { useXRPLContext } from '.';

export function useXRPLBalances(
  address: string,
  options?: {
    ledger_hash?: string;
    ledger_index?: LedgerIndex;
    peer?: string;
    limit?: number;
  }
) {
  const { client } = useXRPLContext();
  const fetcher = () => {
    if (!client) {
      return null;
    }
    return client.getBalances(address, options);
  };
  return useSWR(client ? JSON.stringify([address, options]) : null, fetcher);
}
