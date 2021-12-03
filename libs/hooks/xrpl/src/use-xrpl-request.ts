import useSWR from 'swr';
import { useXRPLContext } from '.';

export function useXRPLRequest(args: any) {
  const { client } = useXRPLContext();
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
