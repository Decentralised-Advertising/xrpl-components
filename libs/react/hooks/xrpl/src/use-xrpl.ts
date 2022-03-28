import { useCallback, useEffect, useRef, useState } from 'react';
import type { Client } from 'xrpl';
import { resolveXRPL, XRPL } from './resolve-xrpl-client';

export interface IUseXRPLConfig {
  server: string;
  xrpl?: XRPL;
}

type ConnectionState = 'disconnected' | 'connecting' | 'connected';

export interface IUseXRPL {
  client: Client | null;
  connectionState: ConnectionState;
  error: Error | null;
  reconnect: () => void;
}

export function useXRPL({ server, xrpl }: IUseXRPLConfig): IUseXRPL {
  const [xrplInstance] = useState<XRPL>(() => xrpl || resolveXRPL());
  const [connectionState, setConnectionState] =
    useState<ConnectionState>('disconnected');
  const [error, setError] = useState<Error | null>(null);
  const client = useRef<Client | null>(null);

  const reconnect = useCallback(async () => {
    try {
      setError(null);
      setConnectionState('connecting');
      client.current = new xrplInstance.Client(server);

      client.current.on('connected', () => {
        setConnectionState('connected');
      });

      client.current.on('disconnected', () => {
        setConnectionState('disconnected');
      });

      await client.current.connect();
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
        return;
      }
      if (typeof err === 'string') {
        setError(new Error(err));
        return;
      }
      setError(new Error('Unknown error'));
    }
  }, [server, xrplInstance]);

  useEffect(() => {
    reconnect();

    return () => {
      setConnectionState('disconnected');
      if (client.current) {
        client.current.disconnect();
        client.current.removeAllListeners();
      }
      client.current = null;
    };
  }, [server, xrplInstance, reconnect]);

  return {
    client: client.current,
    connectionState,
    error,
    reconnect,
  };
}
