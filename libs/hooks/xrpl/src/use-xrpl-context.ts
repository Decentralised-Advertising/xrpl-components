import { createContext, useContext } from 'react';
import { IUseXRPL } from './use-xrpl';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface XRPLContextProps extends IUseXRPL {}

export const XRPLContext = createContext({} as XRPLContextProps);

export function useXRPLContext(): XRPLContextProps {
  return useContext(XRPLContext);
}
