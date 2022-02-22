import { Meta, Story } from '@storybook/react';
import { useXRPLGlobal } from '@xrpl-components/react/hooks/xrpl';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Formik, Form, Field } from 'formik';

function EmptyComponent() {
  return null;
}

export default {
  component: EmptyComponent,
  title: 'Forms/XRPL Address Validation',
} as Meta;

interface TailwindReactHookFormData {
  xrplAddress: string;
}

export const TailwindReactHookForm: Story<unknown> = () => {
  const { xrpl } = useXRPLGlobal();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TailwindReactHookFormData>();

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
          <label
            htmlFor="xrplAddress"
            className="block text-sm font-medium leading-5 text-gray-700 dark:text-gray-400"
          >
            XRPL Address
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              id="xrplAddress"
              type="text"
              autoComplete="off"
              className={`border-gray-300 dark:text-gray-100 dark:bg-gray-700 dark:border-gray-500 dark:focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:ring-opacity-50 dark:placeholder-gray-500 rounded-md focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 placeholder-gray-400 py-3 px-4 block w-full transition ease-in-out duration-150 ${
                !errors.xrplAddress
                  ? ''
                  : 'border-red-300 text-red-900 placeholder-red-300 outline-red-300 focus:border-red-300 focus:shadow-outline-red dark:border-red-400 dark:text-red-500 dark:placeholder-red-200 dark:focus:border-red-300 dark:focus:shadow-outline-red'
              }`}
              placeholder="Enter a valid XRPL address"
              {...register('xrplAddress', {
                required: true,
                validate: (xrplAddress) => xrpl.isValidAddress(xrplAddress),
              })}
              aria-invalid={errors.xrplAddress ? 'true' : 'false'}
              aria-describedby="xrpl-address-error"
              disabled={isSubmitting}
            />
          </div>
          {errors.xrplAddress && (
            <p
              className="mt-2 text-sm text-red-600 dark:text-red-400"
              id="xrpl-address-error"
            >
              {errors.xrplAddress.type === 'required' &&
                'XRPL address is required'}
              {errors.xrplAddress.type === 'validate' &&
                'The given value is not a valid XRPL address'}
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
  const { xrpl } = useXRPLGlobal();

  return (
    <div className="bg-gray-100 dark:bg-gray-900 p-12">
      <Formik
        initialValues={{
          xrplAddress: '',
        }}
        onSubmit={(data, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(data));
            setSubmitting(false);
          }, 2000);
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="grid gap-y-6 grid-cols-2 sm:gap-x-8">
            <div className="col-span-2">
              <label
                htmlFor="xrplAddress"
                className="block text-sm font-medium leading-5 text-gray-700 dark:text-gray-400"
              >
                XRPL Address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <Field
                  name="xrplAddress"
                  autoComplete="off"
                  className={`border-gray-300 dark:text-gray-100 dark:bg-gray-700 dark:border-gray-500 dark:focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:ring-opacity-50 dark:placeholder-gray-500 rounded-md focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 placeholder-gray-400 py-3 px-4 block w-full transition ease-in-out duration-150 ${
                    !errors.xrplAddress
                      ? ''
                      : 'border-red-300 text-red-900 placeholder-red-300 outline-red-300 focus:border-red-300 focus:shadow-outline-red dark:border-red-400 dark:text-red-500 dark:placeholder-red-200 dark:focus:border-red-300 dark:focus:shadow-outline-red'
                  }`}
                  placeholder="Enter a valid XRPL address"
                  validate={(xrplAddress: string) => {
                    if (!xrplAddress) {
                      return 'XRPL address is required';
                    }
                    if (xrpl.isValidAddress(xrplAddress)) {
                      return;
                    }
                    return 'The given value is not a valid XRPL address';
                  }}
                  aria-invalid={errors.xrplAddress ? 'true' : 'false'}
                  aria-describedby="xrpl-address-error"
                  disabled={isSubmitting}
                />
              </div>
              {errors.xrplAddress && touched.xrplAddress && (
                <p
                  className="mt-2 text-sm text-red-600 dark:text-red-400"
                  id="xrpl-address-error"
                >
                  {errors.xrplAddress}
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
