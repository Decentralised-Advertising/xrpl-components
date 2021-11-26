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
      <AccountBalance></AccountBalance>
    </div>
  );
}

export default Index;
