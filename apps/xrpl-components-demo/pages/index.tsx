import { AccountBalance } from '@xrpl-components/components/account-balance';
import styles from './index.module.css';

export function Index() {
  return (
    <div className={styles.page}>
      <AccountBalance account="rG1QQv2nh2gr7RCZ1P8YYcBUKCCN633jCn"></AccountBalance>
    </div>
  );
}

export default Index;
