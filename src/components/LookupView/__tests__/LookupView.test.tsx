import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { LookupView } from '../LookupView';

describe('<LookupView />', () => {
	it('should render the expected elements', () => {
		render(<LookupView />);

		expect(
			screen.getByRole('heading', { name: 'Validate email addresses' }),
		).toBeVisible();
		expect(
			screen.getByRole('textbox', { name: 'Email address' }),
		).toBeVisible();
		expect(screen.getByRole('button', { name: 'Validate' })).toBeVisible();

		expect(screen.getByText('No results.')).toBeVisible();
	});
});
