import { useEffect, useState } from 'react';
import { Story, Meta } from '@storybook/react';
import { useXRPLContext } from '@xrpl-components/hooks/xrpl';
import { XRPLContextProvider } from './xrpl-context-provider';

export default {
  component: XRPLContextProvider,
  title: 'XRPLContextProvider',
  argTypes: {
    selectedNetwork: {
      options: ['mainnet', 'testnet', 'devnet'],
      control: { type: 'radio' },
      defaultValue: 'mainnet',
    },
  },
} as Meta;

const ExampleContextConsumer = ({
  selectedNetwork,
}: {
  selectedNetwork: string;
}) => {
  const { client, network, setNetwork, availableNetworks } = useXRPLContext();
  const [ledgerIndex, setLedgerIndex] = useState<number | null>();

  useEffect(() => {
    setNetwork(
      availableNetworks.find((n) => n.name === selectedNetwork) || network
    );
    setLedgerIndex(null);
  }, [selectedNetwork, availableNetworks, network, setNetwork]);

  useEffect(() => {
    async function updateLedgerIndex() {
      if (!client) {
        return;
      }
      const l = await client.getLedgerIndex();
      setLedgerIndex(l);
    }
    updateLedgerIndex();
  }, [client]);

  return (
    <div>
      <h1>{network.name}</h1>
      <h1>{network.server}</h1>
      <h1>{ledgerIndex || 'Loading ledger index...'}</h1>
    </div>
  );
};

const Template: Story<any> = ({ selectedNetwork }) => (
  <XRPLContextProvider>
    <ExampleContextConsumer selectedNetwork={selectedNetwork} />
  </XRPLContextProvider>
);

export const Primary = Template.bind({});
