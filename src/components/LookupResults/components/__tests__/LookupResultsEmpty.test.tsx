import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { LookupResultsEmpty } from '../LookupResultsEmpty';

describe('<LookupResultsEmpty />', () => {
	it('should render as expected', async () => {
		render(<LookupResultsEmpty />);

		expect(screen.getByText('No results.')).toBeVisible();
	});
});
