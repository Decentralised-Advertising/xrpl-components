import { Meta, Story } from '@storybook/react';
import { useCurrencyConverter } from '@xrpl-components/react/hooks/xrpl';
import { Field, Form, Formik } from 'formik';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

function EmptyComponent() {
  return null;
}

export default {
  component: EmptyComponent,
  title: 'Forms/Amount Input',
} as Meta;

interface TailwindReactHookFormData {
  amount: string;
}

export const TailwindReactHookForm: Story<unknown> = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { rates, error: ratesError } = useCurrencyConverter({
    fromCurrency: 'XRP',
    toCurrency: 'USD',
  });
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<TailwindReactHookFormData>();
  const watchAmount = watch('amount', '0');

  const onSubmit = (data: TailwindReactHookFormData) => {
    setIsSubmitting(true);
    setTimeout(() => {
      alert(JSON.stringify(data));
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 p-12">
      <form
        className="validate grid gap-y-6 grid-cols-2 sm:gap-x-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="col-span-2">
          <div>
            <div className="flex justify-between">
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-700"
              >
                Amount
              </label>
              {!ratesError && rates && (
                <span
                  className="text-sm text-gray-400"
                  id="usd-conversion"
                  data-chromatic="ignore"
                >
                  {watchAmount && Number(watchAmount) !== 0 ? (
                    <>
                      {watchAmount} XRP &#8773;{' '}
                      {(Number(watchAmount) * rates.USD).toFixed(4)} USD
                    </>
                  ) : (
                    <>1 XRP = {rates.USD} USD</>
                  )}
                </span>
              )}
            </div>

            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute -top-0.5 inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span
                  className="text-gray-500 sm:text-sm"
                  style={{
                    fontFamily: `"currency_symbols", 'Space Mono', monospace`,
                    fontWeight: 400,
                  }}
                >
                  
                </span>
              </div>
              <input
                type="number"
                id="amount"
                className="border-gray-300 dark:text-gray-100 dark:bg-gray-700 dark:border-gray-500 dark:focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:ring-opacity-50 dark:placeholder-gray-500 rounded-md focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 placeholder-gray-400 py-3 block w-full transition ease-in-out duration-150 pl-10 pr-16"
                placeholder="0.00"
                {...register('amount', {
                  required: true,
                })}
                aria-invalid={errors.amount ? 'true' : 'false'}
                aria-describedby="amount-currency"
                disabled={isSubmitting}
              />
              <div className="absolute inset-y-0 right-0 pr-5 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm" id="amount-currency">
                  XRP
                </span>
              </div>
            </div>
          </div>
          {errors.amount && (
            <p
              className="mt-2 text-sm text-red-600 dark:text-red-400"
              id="amount-error"
            >
              {errors.amount.type === 'required' && 'Amount is required'}
            </p>
          )}
        </div>

        <div className="col-span-2">
          <span className="w-full inline-flex rounded-md shadow-sm">
            <button
              disabled={isSubmitting}
              type="submit"
              className={`w-full px-6 py-3 bg-gradient-to-r from-teal-400 to-blue-500 text-white text-base leading-6 font-medium shadow border-transparent rounded inline-flex items-center justify-center transition ease-in-out duration-150 ${
                !Object.keys(errors).length && !isSubmitting
                  ? 'cursor-pointer hover:from-teal-500 hover:to-blue-600'
                  : 'cursor-not-allowed opacity-50'
              }`}
            >
              {isSubmitting && (
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              )}

              {!isSubmitting && 'Submit Form'}

              {isSubmitting && 'Submitting...'}
            </button>
          </span>
        </div>
      </form>
    </div>
  );
};

export const TailwindFormikForm: Story<unknown> = () => {
  const { rates, error: ratesError } = useCurrencyConverter({
    fromCurrency: 'XRP',
    toCurrency: 'USD',
  });

  return (
    <div className="bg-gray-100 dark:bg-gray-900 p-12">
      <Formik
        initialValues={{
          amount: '',
        }}
        onSubmit={(data, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(data));
            setSubmitting(false);
          }, 2000);
        }}
      >
        {({ errors, touched, isSubmitting, values, setFieldValue }) => (
          <Form className="grid gap-y-6 grid-cols-2 sm:gap-x-8">
            <div className="col-span-2">
              <div>
                <div className="flex justify-between">
                  <label
                    htmlFor="amount"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Amount
                  </label>
                  {!ratesError && rates && (
                    <span
                      className="text-sm text-gray-400"
                      id="usd-conversion"
                      data-chromatic="ignore"
                    >
                      {values && Number(values.amount) !== 0 ? (
                        <>
                          {values.amount} XRP &#8773;{' '}
                          {(Number(values.amount) * rates.USD).toFixed(4)} USD
                        </>
                      ) : (
                        <>1 XRP = {rates.USD} USD</>
                      )}
                    </span>
                  )}
                </div>

                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute -top-0.5 inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span
                      className="text-gray-500 sm:text-sm"
                      style={{
                        fontFamily: `"currency_symbols", 'Space Mono', monospace`,
                        fontWeight: 400,
                      }}
                    >
                      
                    </span>
                  </div>
                  <Field
                    type="number"
                    name="amount"
                    id="amount"
                    validate={(amount: string) => {
                      if (!amount) {
                        return 'Amount is required';
                      }
                      return;
                    }}
                    className="border-gray-300 dark:text-gray-100 dark:bg-gray-700 dark:border-gray-500 dark:focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:ring-opacity-50 dark:placeholder-gray-500 rounded-md focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 placeholder-gray-400 py-3 block w-full transition ease-in-out duration-150 pl-10 pr-16"
                    placeholder="0.00"
                    aria-invalid={errors.amount ? 'true' : 'false'}
                    aria-describedby="amount-currency"
                    disabled={isSubmitting}
                  />
                  <div className="absolute inset-y-0 right-0 pr-5 flex items-center pointer-events-none">
                    <span
                      className="text-gray-500 sm:text-sm"
                      id="amount-currency"
                    >
                      XRP
                    </span>
                  </div>
                </div>
              </div>
              {errors.amount && touched.amount && (
                <p
                  className="mt-2 text-sm text-red-600 dark:text-red-400"
                  id="amount-error"
                >
                  {errors.amount}
                </p>
              )}
            </div>

            <div className="col-span-2">
              <span className="w-full inline-flex rounded-md shadow-sm">
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className={`w-full px-6 py-3 bg-gradient-to-r from-teal-400 to-blue-500 text-white text-base leading-6 font-medium shadow border-transparent rounded inline-flex items-center justify-center transition ease-in-out duration-150 ${
                    !Object.keys(errors).length && !isSubmitting
                      ? 'cursor-pointer hover:from-teal-500 hover:to-blue-600'
                      : 'cursor-not-allowed opacity-50'
                  }`}
                >
                  {isSubmitting && (
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  )}

                  {!isSubmitting && 'Submit Form'}

                  {isSubmitting && 'Submitting...'}
                </button>
              </span>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
