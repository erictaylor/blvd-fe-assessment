import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { LEGEND_VALUES } from '../../constants';
import { LookupResultsTable } from '../LookupResultsTable';

describe('<LookupResultsTable />', () => {
	it('should expected table headers', async () => {
		render(<LookupResultsTable results={[]} />);

		expect(
			screen.getByRole('table', { name: 'Email validation results' }),
		).toBeVisible();

		expect(screen.getByRole('columnheader', { name: 'Email' })).toBeVisible();
		expect(screen.getByRole('columnheader', { name: 'DNS' })).toBeVisible();
		expect(screen.getByRole('columnheader', { name: 'Format' })).toBeVisible();
		expect(
			screen.getByRole('columnheader', { name: 'Disposable' }),
		).toBeVisible();
		expect(screen.getByRole('columnheader', { name: 'Aliased' })).toBeVisible();
	});

	it('should render a verified email row', () => {
		render(
			<LookupResultsTable
				results={[
					{
						email: 'eric@daxos.com',
						dns: true,
						format: true,
					},
				]}
			/>,
		);

		const validEmailRow = screen.getByRole('row', { name: 'eric@daxos.com' });

		expect(validEmailRow).toBeVisible();

		expect(validEmailRow).toHaveTextContent(LEGEND_VALUES.DNS_VALID);
	});

	it('should render a unverified email row', () => {
		render(
			<LookupResultsTable
				results={[
					{
						email: 'eric@daxos.com',
						dns: false,
						format: true,
					},
				]}
			/>,
		);

		const validEmailRow = screen.getByRole('row', { name: 'eric@daxos.com' });

		expect(validEmailRow).toBeVisible();

		expect(validEmailRow).toHaveTextContent(LEGEND_VALUES.DNS_INVALID);
	});

	it('should render a invalid format email row', () => {
		render(
			<LookupResultsTable
				results={[
					{
						email: 'eric@daxos.com',
						format: false,
					},
				]}
			/>,
		);

		const validEmailRow = screen.getByRole('row', { name: 'eric@daxos.com' });

		expect(validEmailRow).toBeVisible();

		expect(validEmailRow).toHaveTextContent(LEGEND_VALUES.FORMAT_INVALID);
	});

	it('should render a disposable email row', () => {
		render(
			<LookupResultsTable
				results={[
					{
						email: 'eric@daxos.com',
						disposable: true,
						dns: true,
						format: true,
					},
				]}
			/>,
		);

		const validEmailRow = screen.getByRole('row', { name: 'eric@daxos.com' });

		expect(validEmailRow).toBeVisible();

		expect(validEmailRow).toHaveTextContent(LEGEND_VALUES.DISPOSABLE);
	});

	it('should render a aliased email row', () => {
		render(
			<LookupResultsTable
				results={[
					{
						email: 'eric@daxos.com',
						alias: true,
						dns: true,
						format: true,
					},
				]}
			/>,
		);

		const validEmailRow = screen.getByRole('row', { name: 'eric@daxos.com' });

		expect(validEmailRow).toBeVisible();

		expect(validEmailRow).toHaveTextContent(LEGEND_VALUES.ALIAS);
	});
});
