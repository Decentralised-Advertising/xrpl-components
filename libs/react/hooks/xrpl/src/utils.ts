import useSWR, { SWRResponse } from 'swr';

export interface IWellKnownAccount {
  account: string;
  name: string;
  domain?: string;
  verified?: boolean;
  twitter?: string;
  desc?: string;
}

function useWellKnownName(
  accountAddress: string
): SWRResponse<IWellKnownAccount | null, any> {
  return useSWR('https://api.xrpscan.com/api/v1/names/well-known', (url) => {
    return fetch(url)
      .then((res) => res.json())
      .then((accounts) =>
        accounts.find(
          ({ account }: IWellKnownAccount) => account === accountAddress
        )
      );
  });
}
