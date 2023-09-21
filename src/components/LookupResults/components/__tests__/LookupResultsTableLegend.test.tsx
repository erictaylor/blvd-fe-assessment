import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { LEGEND_VALUES } from '../../constants';
import { LookupResultsTableLegend } from '../LookupResultsTableLegend';

describe('<LookupResultsTableLegend />', () => {
	it('should render as expected', async () => {
		render(<LookupResultsTableLegend />);

		expect(
			screen.getByText(`${LEGEND_VALUES.DNS_VALID} = DNS has valid MX records`),
		).toBeVisible();

		expect(
			screen.getByText(
				`${LEGEND_VALUES.DNS_INVALID} = DNS does not have valid MX records`,
			),
		).toBeVisible();

		expect(
			screen.getByText(
				`${LEGEND_VALUES.FORMAT_INVALID} = Not a valid email format`,
			),
		).toBeVisible();

		expect(
			screen.getByText(
				`${LEGEND_VALUES.DISPOSABLE} = Email is known as disposable`,
			),
		).toBeVisible();
	});
});
