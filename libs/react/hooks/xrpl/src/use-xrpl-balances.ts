import { useCallback, useEffect, useState } from 'react';
import type { LedgerIndex } from 'xrpl/dist/npm/models/common';
import { useXRPLContext } from './use-xrpl-context';

export function useXRPLBalances(
  address: string,
  options?: {
    ledger_hash?: string;
    ledger_index?: LedgerIndex;
    peer?: string;
    limit?: number;
  }
) {
  const { client, connectionState } = useXRPLContext();
  const [data, setData] = useState<
    | {
        value: string;
        currency: string;
        issuer?: string | undefined;
      }[]
    | null
  >(null);
  const [error, setError] = useState(null);

  const refreshBalances = useCallback(() => {
    setData(null);
    setError(null);
    if (!client || connectionState !== 'connected') {
      return;
    }
    client
      .getBalances(address, options)
      .then((data) => {
        setData(data);
        setError(null);
      })
      .catch((err) => {
        setError(err);
        setData(null);
      });
  }, [client, connectionState, address, options]);

  useEffect(() => {
    refreshBalances();
  }, [address, client, refreshBalances]);

  return {
    data,
    error,
    refreshBalances,
  };
}
