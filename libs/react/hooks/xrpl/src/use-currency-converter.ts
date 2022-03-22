import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface Options {
  fromCurrency: string;
  toCurrency: string;
}

export function useCurrencyConverter({ fromCurrency, toCurrency }: Options) {
  const { data, error } = useSWR(
    `https://min-api.cryptocompare.com/data/price?fsym=` +
      `${fromCurrency.toUpperCase()}&tsyms=${toCurrency.toUpperCase()}`,
    fetcher,
    {
      refreshInterval: 5000,
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    rates: data,
    isLoading: !error && !data,
    error,
  };
}
