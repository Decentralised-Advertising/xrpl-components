import { useEffect, useState } from 'react';
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
  const [data, setData] = useState<
    | {
        value: string;
        currency: string;
        issuer?: string | undefined;
      }[]
    | null
  >(null);
  const [error, setError] = useState(null);
  const refreshBalances = () => {
    if (!client) {
      return;
    }
    setData(null);
    setError(null);
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
  };
  useEffect(() => {
    refreshBalances();
  }, [address, client]);
  return {
    data,
    error,
    refreshBalances,
  };
}
