import { useXRPLRequest } from '@xrpl-components/hooks/xrpl';
import './account-balance.module.css';

/* eslint-disable-next-line */
export interface AccountBalanceProps {
  account: string;
}

export function AccountBalance({ account }: AccountBalanceProps) {
  const { data, error } = useXRPLRequest({
    command: 'account_info',
    account,
    ledger_index: 'validated',
  });

  if (error) {
    return <div>Error: {JSON.stringify(error)}</div>;
  }

  console.log('render', { data });

  return (
    <div>
      <h1>Account Balance Data</h1>

      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
