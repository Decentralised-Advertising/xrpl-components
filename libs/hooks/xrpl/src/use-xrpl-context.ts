import { createContext, useContext } from 'react';
import { IUseXRPL } from './use-xrpl';

interface XRPLContextProps extends IUseXRPL {}

export const XRPLContext = createContext({} as XRPLContextProps);

export function useXRPLContext(): XRPLContextProps {
  return useContext(XRPLContext);
}
