import { useCallback, useState } from 'react';
import type { EmailData } from '../../types';
import { fetchEmailValidation } from './utils';

/**
 * A custom hook that returns a function to fetch email validation data and a boolean indicating if the request is currently fetching
 *
 * @param onAddToResponses a callback function that will be called when the email validation response is received
 * @returns a tuple containing the getEmailValidation function and a boolean indicating if the request is currently fetching
 */
export const useFetchEmailValidation = (
	onAddToResponses: (data: EmailData) => void,
): [getEmailValidation: (email: string) => void, isFetching: boolean] => {
	const [isFetching, setIsFetching] = useState(false);

	const getEmailValidation = useCallback(
		(email: string) => {
			setIsFetching(true);

			fetchEmailValidation(email)
				.then((data) => {
					onAddToResponses({
						...data,
						email,
					});
				})
				.catch((error: unknown) => {
					// In a production level app, we would want to handle this in a more user friendly way.
					// Such as displaying a message to the user that something went wrong (ie toast), and to try again later.
					// We would also want to log the error to a logging service, such as Sentry.
					//
					// For the sake of time of this assessment, I am just going to console.error and alert the user.
					console.error(error);
					alert('Something went wrong. Please try again later.');
				})
				.finally(() => {
					setIsFetching(false);
				});
		},
		[onAddToResponses],
	);

	return [getEmailValidation, isFetching];
};
