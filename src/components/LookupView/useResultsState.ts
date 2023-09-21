import { useCallback, useState } from 'react';
import type { EmailData } from '../../types';

/**
 * The hook that manages lookup results state, and the logic for adding new results.
 *
 * Results are added to the beginning of the results array, and duplicates for addresses are removed.
 */
export const useResultsState = (): [
	results: readonly EmailData[],
	onEmailLookupComplete: (data: EmailData) => void,
] => {
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

	return [results, onEmailLookupComplete];
};
