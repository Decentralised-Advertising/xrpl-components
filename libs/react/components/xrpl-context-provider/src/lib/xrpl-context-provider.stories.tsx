import { useEffect, useState } from 'react';
import { Story, Meta } from '@storybook/react';
import { useXRPLContext } from '@xrpl-components/react/hooks/xrpl';
import { XRPLContextProvider } from './xrpl-context-provider';
import { defaultNetworks } from '@xrpl-components/react/hooks/xrpl';

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
  const { client, connectionState, error, reconnect } = useXRPLContext();
  const [ledgerIndex, setLedgerIndex] = useState<number | null>();

  useEffect(() => {
    async function updateLedgerIndex() {
      if (!client || connectionState !== 'connected') {
        setLedgerIndex(null);
        return;
      }
      const l = await client.getLedgerIndex();
      setLedgerIndex(l);
    }
    updateLedgerIndex();
  }, [client, connectionState]);

  return (
    <div>
      <h1>{server}</h1>
      {connectionState && <h1>{connectionState}</h1>}
      {error && <h1>Error: {error.message}</h1>}
      <h1 data-chromatic="ignore">
        {ledgerIndex || 'Loading ledger index...'}
      </h1>

      <button
        className={`mt-12 px-6 py-3 bg-gradient-to-r from-teal-400 to-blue-500 text-white text-base leading-6 font-medium shadow border-transparent rounded inline-flex items-center justify-center transition ease-in-out duration-150 cursor-pointer hover:from-teal-500 hover:to-blue-600`}
        onClick={() => reconnect()}
      >
        Manually Reconnect
      </button>
    </div>
  );
};

const Template: Story<any> = ({ server }) => (
  <XRPLContextProvider server={server}>
    <ExampleContextConsumer server={server} />
  </XRPLContextProvider>
);

export const Primary = Template.bind({});
