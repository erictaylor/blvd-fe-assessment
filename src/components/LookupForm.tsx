import { type FormEventHandler, useCallback, useRef } from 'react';
import { EmailData } from '../types';

interface LookupFormProps {
	/**
	 * Call this function with resolved email response to add to retrieved results state.
	 */
	onEmailLookupComplete: (data: EmailData) => void;
}

export const LookupForm = ({
	onEmailLookupComplete,
}: LookupFormProps): JSX.Element => {
	const emailInputRef = useRef<HTMLInputElement>(null);

	const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
		(event) => {
			event.preventDefault();

			if (emailInputRef.current === null) {
				return;
			}

			if (emailInputRef.current.validity.valid) {
				const data = new FormData(event.currentTarget);

				const email = data.get('email')?.toString();

				if (!email) {
					return;
				}

				console.log('email', email);
			}

			return;
		},
		[],
	);

	return (
		<form className="mt-6 sm:flex sm:items-center" onSubmit={handleSubmit}>
			<label htmlFor="email" className="sr-only">
				Email addresses
			</label>
			<div className="grid grid-cols-1 sm:flex-auto">
				<input
					autoCapitalize="off"
					autoComplete="off"
					autoCorrect="off"
					type="email"
					name="email"
					id="email"
					className="peer relative col-start-1 row-start-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
					placeholder="Enter an email"
					ref={emailInputRef}
				/>
				<div
					className="col-start-1 col-end-3 row-start-1 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 peer-focus:ring-2 peer-focus:ring-indigo-600 peer-invalid:ring-red-600"
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
					type="submit"
					className="block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
				>
					Validate
				</button>
			</div>
		</form>
	);
};
