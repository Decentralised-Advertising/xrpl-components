import { Meta, Story } from '@storybook/react';
import { XRPLContextProvider } from '@xrpl-components/react/components/xrpl-context-provider';
import { defaultNetworks } from '@xrpl-components/react/hooks/xrpl';
import { AccountBalance, AccountBalanceProps } from './account-balance';

export default {
  component: AccountBalance,
  title: 'AccountBalance',
  args: {
    account: 'rG1QQv2nh2gr7RCZ1P8YYcBUKCCN633jCn',
  },
  argTypes: {
    server: {
      options: defaultNetworks.map((n) => n.server),
      control: { type: 'radio' },
      defaultValue: defaultNetworks[0].server,
    },
  },
} as Meta;

const UnstyledTemplate: Story<AccountBalanceProps & { server: string }> = (
  args
) => (
  <XRPLContextProvider server={args.server}>
    <AccountBalance {...args}>
      {({ isLoading, value, currency, error }) => {
        if (isLoading) {
          return <div>Loading account balance...</div>;
        }
        if (error) {
          return <div>Error: {error.message}</div>;
        }
        return (
          <div>
            <AccountBalance.Currency>{currency}</AccountBalance.Currency>{' '}
            <AccountBalance.Value>{value}</AccountBalance.Value>
          </div>
        );
      }}
    </AccountBalance>
  </XRPLContextProvider>
);

export const Unstyled = UnstyledTemplate.bind({});

const TailwindTemplate: Story<AccountBalanceProps & { server: string }> = (
  args
) => (
  <XRPLContextProvider server={args.server}>
    <AccountBalance {...args}>
      {({ isLoading, value, currency, error }) => {
        return (
          <div
            // Disable snapshot diffing on chromatic until we can figure out a way to render something determinisitcally for it
            data-chromatic="ignore"
            className={`text-4xl bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 p-4 h-20 flex items-center justify-center ${
              error ? '' : 'w-80'
            }`}
            style={{
              fontFamily: `"currency_symbols", 'Space Mono', monospace`,
              fontWeight: 400,
            }}
          >
            {isLoading ? (
              <img
                className="w-9 h-9"
                src="/images/xrp-loader.c0ef7e34.png"
                alt="Loading account balance..."
              />
            ) : error ? (
              <div className="">Error: {error.message}</div>
            ) : (
              // Apply a negative margin at the top to compensate for the monospace font
              <div className="flex items-center justify-center space-x-2 -mt-2">
                <div>
                  <AccountBalance.Currency unicodeSymbol={true}>
                    {currency}
                  </AccountBalance.Currency>
                </div>
                <div>
                  <AccountBalance.Value>{value}</AccountBalance.Value>
                </div>
              </div>
            )}
          </div>
        );
      }}
    </AccountBalance>
  </XRPLContextProvider>
);

export const Tailwind = TailwindTemplate.bind({});
