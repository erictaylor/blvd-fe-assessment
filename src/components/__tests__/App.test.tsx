import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { App } from '../App';

vi.mock('../LookupView', () => {
	return {
		LookupView: () => {
			return <h1>LookupView</h1>;
		},
	};
});

describe('<App />', () => {
	it('should render as expected', async () => {
		render(<App />);

		expect(
			screen.getByRole('heading', { name: 'LookupView' }),
		).toBeInTheDocument();
	});
});
