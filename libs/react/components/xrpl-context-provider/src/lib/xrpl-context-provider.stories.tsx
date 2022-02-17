import { useEffect, useState } from 'react';
import { Story, Meta } from '@storybook/react';
import { useXRPLContext } from '@xrpl-components/react/hooks/xrpl';
import { XRPLContextProvider } from './xrpl-context-provider';
import { defaultNetworks } from 'libs/react/hooks/xrpl/src/default-networks';

export default {
  component: XRPLContextProvider,
  title: 'XRPLContextProvider',
  argTypes: {
    server: {
      options: defaultNetworks.map((n) => n.server),
      control: { type: 'radio' },
      defaultValue: defaultNetworks[0].server,
    },
  },
} as Meta;

const ExampleContextConsumer = ({ server }: { server: string }) => {
  const { client, isConnected, isConnecting, error } = useXRPLContext();
  const [ledgerIndex, setLedgerIndex] = useState<number | null>();

  useEffect(() => {
    async function updateLedgerIndex() {
      if (!client) {
        setLedgerIndex(null);
        return;
      }
      const l = await client.getLedgerIndex();
      setLedgerIndex(l);
    }
    updateLedgerIndex();
  }, [client]);

  return (
    <div>
      <h1>{server}</h1>
      {isConnected && <h1>Connected</h1>}
      {isConnecting && <h1>Connecting</h1>}
      {error && <h1>Error: {error.message}</h1>}
      <h1>{ledgerIndex || 'Loading ledger index...'}</h1>
    </div>
  );
};

const Template: Story<any> = ({ server }) => (
  <XRPLContextProvider server={server}>
    <ExampleContextConsumer server={server} />
  </XRPLContextProvider>
);

export const Primary = Template.bind({});
