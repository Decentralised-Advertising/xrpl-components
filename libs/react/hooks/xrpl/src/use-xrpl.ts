import { useEffect, useState } from 'react';
import type { Client } from 'xrpl';
import { resolveXRPL } from './resolve-xrpl-client';

export interface IUseXRPLConfig {
  server: string;
  xrpl?: { Client: typeof Client };
}

export interface IUseXRPL {
  client: Client | undefined;
  isConnected: boolean;
  isConnecting: boolean;
  error: any;
}

export function useXRPL({ server, xrpl }: IUseXRPLConfig): IUseXRPL {
  const [connectedServer, setConnectedServer] = useState<string>();
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [client, setClient] = useState<Client | undefined>();
  const [oldClient, setOldClient] = useState<Client | undefined>();
  const [error, setError] = useState<{} | null>(null);

  const updateClient = async () => {
    if (!server) {
      return;
    }
    if (server === connectedServer && isConnected) {
      return;
    }
    if (client) {
      setOldClient(client);
    }
    let xrplApi = xrpl || resolveXRPL();
    const newClient: Client = new xrplApi.Client(server);
    newClient.on('connected', () => {
      setIsConnecting(false);
      setIsConnected(true);
      setClient(newClient);
      setConnectedServer(server);
    });
    newClient.on('disconnected', () => setIsConnected(false));
    newClient.on('error', (errorCode: any, errorMessage: any) => {
      setError({ errorCode, errorMessage });
    });
    setIsConnecting(true);
    setIsConnected(false);
    setError(false);
    newClient.connect().catch((err) => {
      setError(err);
      setIsConnecting(false);
      setClient(undefined)
    });
  };

  const disconnect = async (client: Client) => {
    // TODO: Determine the correct behaviour for disconnecting a client.
    // await client.disconnect()
  };

  useEffect(() => {
    oldClient && disconnect(oldClient);
  }, [oldClient]);

  useEffect(() => {
    updateClient();
  }, [server]);

  return {
    /**
     * TODO: Verify hook behaviour when the client is not available (e.g. CDN reference missing)
     */
    client,
    isConnected,
    isConnecting,
    error,
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
    return;
  }
  throw error;
}
