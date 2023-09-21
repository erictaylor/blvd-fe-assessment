import { LEGEND_VALUES } from '../constants';

/**
 * The legend for the LookupResultsTable legend.
 *
 * Helps explain what the icons on the table represent.
 */
export const LookupResultsTableLegend = (): JSX.Element => {
	return (
		<div className="mt-8 w-full border-t border-gray-300 pt-8 text-xs text-gray-400">
			<ul>
				<li className="py-1">
					{LEGEND_VALUES.DNS_VALID} = DNS has valid MX records
				</li>
				<li className="py-1">
					{LEGEND_VALUES.DNS_INVALID} = DNS does not have valid MX records
				</li>
				<li className="py-1">
					{LEGEND_VALUES.FORMAT_INVALID} = Not a valid email format
				</li>
				<li className="py-1">
					{LEGEND_VALUES.DISPOSABLE} = Email is known as disposable
				</li>
			</ul>
		</div>
	);
};
