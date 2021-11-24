import { Story, Meta } from '@storybook/react';
import {
  ComponentsAccountBalance,
  ComponentsAccountBalanceProps,
} from './components-account-balance';

export default {
  component: ComponentsAccountBalance,
  title: 'ComponentsAccountBalance',
} as Meta;

const Template: Story<ComponentsAccountBalanceProps> = (args) => (
  <ComponentsAccountBalance {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
