import { useCallback, useState } from 'react';
import type { EmailData } from '../types';
import { LookupForm } from './LookupForm';
import { LookupResults } from './LookupResults';

export const LookupView = (): JSX.Element => {
	const [results, setResults] = useState<EmailData[]>([]);

	/**
	 * The function to be called to add the result to the beginning of the results array.
	 *
	 * We are adding the result to the beginning of the array so that the most
	 * recent result is at the top of the list.
	 */
	const onEmailLookupComplete = useCallback((data: EmailData) => {
		setResults((prevResults) => {
			return [
				data,
				// We don't want duplicates for the same email address.
				// So we filter out any previous results that have the same email address.
				...prevResults.filter((result) => {
					return result.email !== data.email;
				}),
			];
		});
	}, []);

	return (
		<div className="mx-auto max-w-md sm:max-w-3xl">
			<div>
				<div className="text-center">
					<h2 className="mt-2 text-base font-semibold leading-6 text-gray-900">
						Validate email addresses
					</h2>
					<p className="mt-1 text-sm text-gray-500">
						Checks if an email is formatted correctly, is disposable, and if it
						has valid MX records.
					</p>
				</div>

				<LookupForm onEmailLookupComplete={onEmailLookupComplete} />
			</div>

			<LookupResults results={results} />
		</div>
	);
};
