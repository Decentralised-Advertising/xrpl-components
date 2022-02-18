import { useXRPLBalances } from '@xrpl-components/react/hooks/xrpl';
import { useMemo } from 'react';

export interface AccountBalanceProps {
  account: string;
  currency?: string;
  issuer?: string;
  children: (props: {
    isLoading: boolean;
    value: string;
    currency: string;
    error: any;
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
  const { data, error } = useXRPLBalances(account);

  if (error) {
    return children({ isLoading: false, value: '0', currency, error });
  }

  if (!data) {
    return children({ isLoading: true, value: '0', currency, error: null });
  }

  const { value } = data?.find((balance) => {
    if (!issuer) {
      return balance.currency === currency;
    }
    return balance.currency === currency && balance.issuer === issuer;
  }) || { value: '', currency };

  return children({ isLoading: false, value, currency, error: null });
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
  children: string;
}

function AccountBalanceCurrency({
  unicodeSymbol,
  children,
}: AccountBalanceCurrencyProps): JSX.Element {
  const currencyToDisplay = useMemo(() => {
    if (children.length !== 40) {
      return children;
    }
    // Split the currency into two digit character codes and convert them to characters
    const currencyChars = children.match(/.{2}/g);
    if (!currencyChars) {
      return children;
    }
    return currencyChars
      .map((charCode) => String.fromCharCode(parseInt(charCode, 16)))
      .join('');
  }, [children]);
  if (unicodeSymbol && currencyToDisplay === 'XRP') {
    return <></>;
  }
  return <>{currencyToDisplay}</>;
}

AccountBalanceCurrency.defaultProps = {
  unicodeSymbol: false,
};
