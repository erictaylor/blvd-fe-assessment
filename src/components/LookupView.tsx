import { useCallback, useState } from 'react';
import type { EmailData } from '../types';
import { LookupForm } from './LookupForm';
import { LookupResults } from './LookupResults';

export const LookupView = (): JSX.Element => {
	const [results, setResults] = useState<EmailData[]>([
		// {
		// 	disposable: false,
		// 	dns: true,
		// 	domain: 'daxos.com',
		// 	format: true,
		// 	email: 'eric@daxos.com',
		// },
	]);

	const onEmailLookupComplete = useCallback((data: EmailData) => {
		setResults((prevResults) => {
			return [data, ...prevResults];
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
