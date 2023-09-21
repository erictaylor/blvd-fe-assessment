import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { LookupForm } from '../LookupForm';
import { fetchEmailValidation } from '../utils';

vi.mock('../utils.ts', () => {
	return {
		fetchEmailValidation: vi
			.fn<
				Parameters<typeof fetchEmailValidation>,
				ReturnType<typeof fetchEmailValidation>
			>()
			.mockResolvedValue({
				dns: true,
				format: true,
			}),
	};
});

describe('<LookupForm />', () => {
	it('renders the form as expected default state', () => {
		const onEmailLookupComplete = vi.fn();

		render(<LookupForm onEmailLookupComplete={onEmailLookupComplete} />);

		const input = screen.getByRole('textbox', { name: 'Email address' });
		const button = screen.getByRole('button', { name: 'Validate' });

		expect(input).toBeVisible();
		expect(button).toBeVisible();

		expect(input).not.toBeDisabled();
		expect(button).not.toBeDisabled();
	});

	it('should call onEmailLookupComplete with expected data', async () => {
		const onEmailLookupComplete = vi.fn();

		render(<LookupForm onEmailLookupComplete={onEmailLookupComplete} />);

		const input = screen.getByRole('textbox', { name: 'Email address' });
		const button = screen.getByRole('button', { name: 'Validate' });

		await userEvent.type(input, 'eric@daxos.com');
		await userEvent.click(button);

		expect(onEmailLookupComplete).toHaveBeenCalledOnce();
		expect(onEmailLookupComplete).toHaveBeenCalledWith({
			dns: true,
			email: 'eric@daxos.com',
			format: true,
		});
	});

	it('should not call onEmailLookupComplete when email is invalid', async () => {
		const onEmailLookupComplete = vi.fn();

		render(<LookupForm onEmailLookupComplete={onEmailLookupComplete} />);

		const input: HTMLInputElement = screen.getByRole('textbox', {
			name: 'Email address',
		});
		const button = screen.getByRole('button', { name: 'Validate' });

		await userEvent.type(input, 'eric');
		await userEvent.click(button);

		expect(onEmailLookupComplete).not.toHaveBeenCalled();
		expect(input.validity.valid).toBe(false);
	});
});
