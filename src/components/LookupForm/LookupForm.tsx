import { type FormEventHandler, useCallback, useRef } from 'react';
import { EmailData } from '../../types';
import { useFetchEmailValidation } from './useFetchEmailValidation';

interface LookupFormProps {
	/**
	 * Call this function with resolved email response to add to retrieved results state.
	 */
	onEmailLookupComplete: (data: EmailData) => void;
}

/**
 * Component used to capture user input of an email address
 * to look up and validate. Submits via a form handler for better accessibility.
 */
export const LookupForm = ({
	onEmailLookupComplete,
}: LookupFormProps): JSX.Element => {
	const emailInputRef = useRef<HTMLInputElement>(null);

	const onAddToResponses = useCallback(
		(data: EmailData) => {
			onEmailLookupComplete(data);

			if (emailInputRef.current) {
				emailInputRef.current.value = '';
			}
		},
		[onEmailLookupComplete],
	);

	const [getEmailValidation, isFetching] =
		useFetchEmailValidation(onAddToResponses);

	const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
		(event) => {
			event.preventDefault();

			if (emailInputRef.current === null) {
				return;
			}

			// No point in processing input that the browser even knows is not a valid email format.
			if (emailInputRef.current.validity.valid) {
				const data = new FormData(event.currentTarget);

				const email = data.get('email')?.toString();

				if (!email) {
					return;
				}

				void getEmailValidation(email);
			}

			return;
		},
		[getEmailValidation],
	);

	return (
		<form className="mt-6 sm:flex sm:items-center" onSubmit={handleSubmit}>
			<label htmlFor="email" className="sr-only">
				Email address
			</label>
			<div className="grid grid-cols-1 sm:flex-auto">
				<input
					autoCapitalize="off"
					autoComplete="off"
					autoCorrect="off"
					className="peer relative col-start-1 row-start-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 disabled:cursor-not-allowed"
					disabled={isFetching}
					id="email"
					name="email"
					placeholder="Enter an email"
					ref={emailInputRef}
					type="email"
				/>
				<div
					className="col-start-1 col-end-3 row-start-1 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 peer-focus:ring-2 peer-focus:ring-indigo-600 peer-invalid:ring-red-600 peer-disabled:bg-slate-50 peer-disabled:ring-slate-200 peer-disabled:text-slate-400"
					aria-hidden="true"
				/>
				{/* <div className="col-start-2 row-start-1 flex items-center">
							<span
								className="h-4 w-px flex-none bg-gray-200"
								aria-hidden="true"
							/>
							<label htmlFor="type" className="sr-only">
								Type
							</label>
							<select
								id="type"
								name="type"
								className="rounded-md border-0 bg-transparent py-1.5 pl-4 pr-7 text-gray-900 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							>
								<option>Email</option>
								<option>Domain</option>
							</select>
						</div> */}
			</div>
			<div className="mt-3 sm:ml-4 sm:mt-0 sm:flex-shrink-0">
				<button
					className="block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed"
					disabled={isFetching}
					type="submit"
				>
					{isFetching ? 'Loading...' : 'Validate'}
				</button>
			</div>
		</form>
	);
};
