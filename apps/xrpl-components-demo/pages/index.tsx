import { AccountBalance } from '@xrpl-components/account-balance';
import styles from './index.module.css';

export function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.css file.
   */
  return (
    <div className={styles.page}>
      <AccountBalance account="rG1QQv2nh2gr7RCZ1P8YYcBUKCCN633jCn"></AccountBalance>
    </div>
  );
}

export default Index;
