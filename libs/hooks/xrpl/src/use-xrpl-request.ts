import useSWR from 'swr';
import { useXRPL } from './use-xrpl';

export function useXRPLRequest(args: any) {
  const { client } = useXRPL();
  const xrplClientRequestFetcher = () => {
    if (!client) {
      return null;
    }
    return client.request(args);
  };
  const { data, error } = useSWR(
    client ? JSON.stringify(args) : null,
    xrplClientRequestFetcher
  );

  return {
    data,
    error,
  };
}
