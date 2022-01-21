import { useXRPLBalances } from '@xrpl-components/hooks/xrpl';
import { useMemo } from 'react';
import './account-balance.module.css';

export interface AccountBalanceProps {
  account: string;
  currency?: string;
  issuer?: string;
  children: (props: {
    isLoading: boolean;
    value: string;
    currency: string;
  }) => JSX.Element;
}

export function AccountBalance({
  account,
  currency: currencyProp,
  children,
  issuer,
}: AccountBalanceProps) {
  const currency = currencyProp || 'XRP';
  if (currency !== 'XRP' && !issuer) {
    throw new Error('An issuer must be provided for a non-XRP currency');
  }

  const currencyToDisplay = useMemo(() => {
    if (currency.length !== 40) {
      return currency;
    }
    // Split the currency into two digit character codes and convert them to characters
    const currencyChars = currency.match(/.{2}/g);
    if (!currencyChars) {
      return currency;
    }
    return currencyChars
      .map((charCode) => String.fromCharCode(parseInt(charCode, 16)))
      .join('');
  }, [currency]);

  const { data, error } = useXRPLBalances(account);

  // TODO: More comprehensive error handling
  if (error) {
    return <div>Error: {JSON.stringify(error)}</div>;
  }

  if (!data) {
    return children({ isLoading: true, value: '', currency: '' });
  }

  const { value } = data?.find((balance) => {
    if (!issuer) {
      return balance.currency === currency;
    }
    return balance.currency === currency && balance.issuer === issuer;
  }) || { value: '', currency };

  return children({ isLoading: false, value, currency: currencyToDisplay });
}

AccountBalance.Value = AccountBalanceValue;
AccountBalance.Currency = AccountBalanceCurrency;

interface AccountBalanceValueProps {
  children: React.ReactNode;
  decimalPlaces?: number;
}

function AccountBalanceValue({
  children,
  decimalPlaces,
}: AccountBalanceValueProps) {
  const value = Number(children);
  return <>{value.toFixed(decimalPlaces)}</>;
}

AccountBalanceValue.defaultProps = {
  decimalPlaces: 2,
};

interface AccountBalanceCurrencyProps {
  unicodeSymbol: boolean;
  children: React.ReactNode;
}

function AccountBalanceCurrency({
  unicodeSymbol,
  children,
}: AccountBalanceCurrencyProps): JSX.Element {
  if (unicodeSymbol && children === 'XRP') {
    return <></>;
  }
  return <>{children}</>;
}

AccountBalanceCurrency.defaultProps = {
  unicodeSymbol: false,
};
