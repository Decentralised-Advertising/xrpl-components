export interface INetwork {
  name: string;
  server: string;
}

export const defaultNetworks: INetwork[] = [
  {
    name: 'mainnet',
    server: 'wss://s1.ripple.com',
  },
  {
    name: 'testnet',
    server: 'wss://s.altnet.rippletest.net'
  },
  {
    name: 'devnet',
    server: 'wss://s.devnet.rippletest.net'
  }
];
