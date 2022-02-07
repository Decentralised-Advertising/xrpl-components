import { AccountBalance } from '@xrpl-components/react/components/account-balance';
import { XRPLContextProvider } from '@xrpl-components/react/components/xrpl-context-provider';
import styles from './index.module.css';

export function Index() {
  return (
    <div className={styles.page}>
      <XRPLContextProvider>
        <AccountBalance account="rG1QQv2nh2gr7RCZ1P8YYcBUKCCN633jCn">
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
    </div>
  );
}

export default Index;
