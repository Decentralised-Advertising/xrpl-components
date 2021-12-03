import { useEffect, useState } from 'react';
import type { Client } from 'xrpl';
import { defaultNetworks, INetwork } from './default-networks';
import { resolveXRPLClient } from './resolve-xrpl-client';

export interface IUseXRPLConfig {
  availableNetworks?: { name: string, server: string }[]
}

export interface IUseXRPL {
  client?: Client;
  isConnected: boolean;
  isConnecting: boolean;
  error: any;
  network: INetwork;
  setNetwork: (network: INetwork) => void;
  availableNetworks: INetwork[];
}

export function useXRPL({ availableNetworks }: IUseXRPLConfig = {}): IUseXRPL {
  availableNetworks = availableNetworks || defaultNetworks;
  const [network, setNetwork] = useState<INetwork>(availableNetworks[0]);
  const [connectedNetwork, setConnectedNetwork] = useState<INetwork>();
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [client, setClient] = useState<Client | undefined>();
  const [oldClient, setOldClient] = useState<Client | undefined>();
  const [error, setError] = useState({});

  const updateClient = async () => {
    if (!network) {
      return;
    }
    if (connectedNetwork?.name === network.name && isConnected) {
      return;
    }
    if (client) {
      setOldClient(client);
    }
    const Client = resolveXRPLClient();
    const newClient: Client = new Client(network.server);
    newClient.on('connected', () => {
      setIsConnecting(false)
      setIsConnected(true)
    });
    newClient.on('disconnected', () => setIsConnected(false));
    newClient.on('error', (errorCode: any, errorMessage: any) => {
      setError({ errorCode, errorMessage });
    });
    await newClient.connect()
    setClient(newClient);
    setIsConnecting(true)
    setConnectedNetwork(network);
  };

  const disconnect = async (client: Client) => {
      // TODO: Determine the correct behaviour for disconnecting a client.
      // await client.disconnect()
  }

  useEffect(() => {
    oldClient && disconnect(oldClient);
  }, [oldClient])

  useEffect(() => {
    updateClient();
  }, [network, connectedNetwork, availableNetworks]);

  return {
    /**
     * TODO: Verify hook behaviour when the client is not available (e.g. CDN reference missing)
     */
    client,
    isConnected,
    isConnecting,
    error,
    network,
    setNetwork,
    availableNetworks,
  };
}

/**
 * Ignore WebSocket DisconnectErrors. Useful for making requests where we don't
 * care about the response and plan to teardown the test before the response
 * has come back.
 *
 * @param error - Thrown error.
 * @throws If error is not websocket disconnect error.
 */
export function ignoreWebSocketDisconnect(error: Error): void {
  if (error.message === 'websocket was closed') {
    return
  }
  throw error
}