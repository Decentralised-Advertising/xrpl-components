import { useEffect, useState } from "react"
import type { Client } from "xrpl";

export const defaultNetworks: { [k: string]: string } = {
    mainnet: "wss://s1.ripple.com",
    testnet: "wss://s.altnet.rippletest.net",
    devnet: "wss://s.devnet.rippletest.net",
}

export function useXRPL() {
    const [availableNetworks, setAvailableNetworks] = useState(defaultNetworks)
    const [network, setNetwork] = useState("mainnet")
    const [connectedNetwork, setConnectedNetwork] = useState<string | null>(null)
    const [isConnected, setIsConnected] = useState(false)
    const [client, setClient] = useState<Client>();
    const [error, setError] = useState({});
    const reconnect = async () => {
        if (!network) {
            return;
        }
        if (connectedNetwork === network && isConnected) {
            return;
        }
        if (!!client) {
            await client.connection.disconnect()
            setIsConnected(false)
        }
        const Client = resolveXRPLClient();
        const newAPI: Client = new Client(defaultNetworks[network]);
        newAPI.on('connected', () => setIsConnected(true))
        newAPI.on('disconnected', () => setIsConnected(false))
        newAPI.on('error', (errorCode: any, errorMessage: any) => {
            setError({ errorCode, errorMessage })
        });
        await newAPI.connect()
        setClient(newAPI)
        setConnectedNetwork(network)
    }
    useEffect(() => { reconnect() }, [network, connectedNetwork, availableNetworks])
    return { client, isConnected, error, network, setNetwork, availableNetworks, setAvailableNetworks }
}


export function resolveXRPLClient(): typeof Client {
    if ((window as any)?.xrpl?.Client) {
        return (window as any).xrpl.Client
    }
    throw new Error("xrpl not defined")
}