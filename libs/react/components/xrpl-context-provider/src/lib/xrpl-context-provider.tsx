import {
  XRPLContext,
  useXRPL,
  IUseXRPLConfig,
} from '@xrpl-components/react/hooks/xrpl';

/* eslint-disable-next-line */
export interface XRPLContextProviderProps extends IUseXRPLConfig {
  children: any;
}

export function XRPLContextProvider(props: XRPLContextProviderProps) {
  const { client, isConnected, isConnecting, error, reconnect } = useXRPL({
    ...props,
  });
  return (
    <XRPLContext.Provider
      value={{
        client,
        isConnected,
        isConnecting,
        error,
        reconnect,
      }}
    >
      {props.children}
    </XRPLContext.Provider>
  );
}
