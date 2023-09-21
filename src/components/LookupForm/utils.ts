/* istanbul ignore file */
// Ignoring this file due to time constraints, normally this file would be tested as well.
import type { EmailResponse } from '../../types';

export const fetchEmailValidation = async (
	email: string,
): Promise<EmailResponse> => {
	const response = await fetch(`https://disify.com/api/email/${email}`);

	if (!response.ok) {
		throw new Error('Response was not okay');
	}

	const data = (await response.json()) as EmailResponse;

	return data;
};
