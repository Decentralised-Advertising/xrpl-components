import { Meta, Story } from '@storybook/react';
import { XRPLContextProvider } from '@xrpl-components/react/components/xrpl-context-provider';
import { AccountBalance, AccountBalanceProps } from './account-balance';

export default {
  component: AccountBalance,
  title: 'AccountBalance',
  args: {
    account: 'rG1QQv2nh2gr7RCZ1P8YYcBUKCCN633jCn',
  },
} as Meta;

const UnstyledTemplate: Story<AccountBalanceProps> = (args) => (
  <XRPLContextProvider>
    <AccountBalance {...args}>
      {({ isLoading, value, currency }) =>
        isLoading ? (
          <div>Loading account balance...</div>
        ) : (
          <div>
            <AccountBalance.Currency>{currency}</AccountBalance.Currency>{' '}
            <AccountBalance.Value>{value}</AccountBalance.Value>
          </div>
        )
      }
    </AccountBalance>
  </XRPLContextProvider>
);

export const Unstyled = UnstyledTemplate.bind({});

const TailwindTemplate: Story<AccountBalanceProps> = (args) => (
  <XRPLContextProvider>
    <AccountBalance {...args}>
      {({ isLoading, value, currency }) => {
        return (
          <div
            className="text-4xl bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 p-4 h-20 flex items-center justify-center w-80"
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
