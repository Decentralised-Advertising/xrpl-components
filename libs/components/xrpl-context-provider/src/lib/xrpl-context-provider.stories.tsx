import { useEffect, useState } from 'react';
import { Story, Meta } from '@storybook/react';
import { useXRPLContext } from '@xrpl-components/hooks/xrpl';
import { XRPLContextProvider } from './xrpl-context-provider';

export default {
  component: XRPLContextProvider,
  title: 'XRPLContextProvider',
} as Meta;

const ExampleContextConsumer = ({ selectedNetwork }: { selectedNetwork: string }) => {
  const { client, network, isConnecting, isConnected, setNetwork, availableNetworks } = useXRPLContext();
  const [ledgerIndex, setLedgerIndex] = useState<number>()
  useEffect(() => {
    setNetwork(availableNetworks.find(n => n.name === selectedNetwork) || network)
    client && client.getLedgerIndex().then(l => {
      setLedgerIndex(l)
    })
  }, [selectedNetwork, client])
  return (
    <div>
      <h1>{network.name}</h1>
      <h1>{network.server}</h1>
      <h1>{ledgerIndex}</h1>
    </div>
  )
}

const Template: Story<any> = ({ selectedNetwork }) => (
  <XRPLContextProvider>
    <ExampleContextConsumer selectedNetwork={selectedNetwork} />
  </XRPLContextProvider>
);

export const Primary = Template.bind({});
Primary.argTypes = {
  selectedNetwork: {
    options: ['mainnet', 'testnet', 'devnet'],
    control: { type: 'radio' },
    defaultValue: 'mainnet'
  }
}