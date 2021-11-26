import { Story, Meta } from '@storybook/react';
import { AccountBalance, AccountBalanceProps } from './account-balance';

export default {
  component: AccountBalance,
  title: 'AccountBalance',
} as Meta;

const Template: Story<AccountBalanceProps> = (args) => (
  <AccountBalance {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  account: 'rG1QQv2nh2gr7RCZ1P8YYcBUKCCN633jCn',
};
