import { useEffect, useState } from 'react';
import type { Client } from 'xrpl';
import { defaultNetworks } from './default-networks';
import { resolveXRPLClient } from './resolve-xrpl-client';

export function useXRPL() {
  const [availableNetworks, setAvailableNetworks] = useState(defaultNetworks);
  const [network, setNetwork] = useState('mainnet');
  const [connectedNetwork, setConnectedNetwork] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [client, setClient] = useState<Client>();
  const [error, setError] = useState({});

  const reconnect = async () => {
    if (!network) {
      return;
    }
    if (connectedNetwork === network && isConnected) {
      return;
    }
    if (client) {
      await client.connection.disconnect();
      setIsConnected(false);
    }
    const Client = resolveXRPLClient();
    const newAPI: Client = new Client(defaultNetworks[network]);
    newAPI.on('connected', () => setIsConnected(true));
    newAPI.on('disconnected', () => setIsConnected(false));
    newAPI.on('error', (errorCode: any, errorMessage: any) => {
      setError({ errorCode, errorMessage });
    });
    await newAPI.connect();
    setClient(newAPI);
    setConnectedNetwork(network);
  };

  useEffect(() => {
    reconnect();
  }, [network, connectedNetwork, availableNetworks]);

  return {
    /**
     * TODO: Verify hook behaviour when the client is not available (e.g. CDN reference missing)
     */
    client,
    isConnected,
    error,
    network,
    setNetwork,
    availableNetworks,
    setAvailableNetworks,
  };
}
