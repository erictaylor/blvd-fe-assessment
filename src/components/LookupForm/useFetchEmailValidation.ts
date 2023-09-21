import { useCallback, useState } from 'react';
import type { EmailData, EmailResponse } from '../../types';

const fetchEmailValidation = async (email: string): Promise<EmailResponse> => {
	const response = await fetch(`https://disify.com/api/email/${email}`);

	if (!response.ok) {
		throw new Error('Response was not okay');
	}

	const data = (await response.json()) as EmailResponse;

	return data;
};

export const useFetchEmailValidation = (
	onAddToResponses: (data: EmailData) => void,
): [getEmailValidation: (email: string) => void, isFetching: boolean] => {
	const [isFetching, setIsFetching] = useState(false);

	const getEmailValidation = useCallback(
		(email: string) => {
			setIsFetching(true);

			fetchEmailValidation(email)
				.then((response) => {
					onAddToResponses({
						...response,
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
