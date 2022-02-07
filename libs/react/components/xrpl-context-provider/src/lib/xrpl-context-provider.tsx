import {
  INetwork,
  XRPLContext,
  useXRPL,
} from '@xrpl-components/react/hooks/xrpl';

/* eslint-disable-next-line */
export interface XRPLContextProviderProps {
  children: any;
  availableNetworks?: INetwork[];
}

export function XRPLContextProvider({
  children,
  availableNetworks: availableNetworksConfig,
}: XRPLContextProviderProps) {
  const {
    client,
    isConnected,
    isConnecting,
    error,
    network,
    setNetwork,
    availableNetworks,
  } = useXRPL({ availableNetworks: availableNetworksConfig });
  return (
    <XRPLContext.Provider
      value={{
        client,
        isConnected,
        isConnecting,
        error,
        network,
        setNetwork,
        availableNetworks,
      }}
    >
      {children}
    </XRPLContext.Provider>
  );
}
