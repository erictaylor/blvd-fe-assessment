import type { EmailData } from '../../../types';
import { LEGEND_VALUES } from '../constants';
import { LookupResultsTableLegend } from './LookupResultsTableLegend';

interface LookupResultsTableProps {
	results: readonly EmailData[];
}

/**
 * Displays a table of previously looked up email addresses and their validation results.
 */
export const LookupResultsTable = ({
	results,
}: LookupResultsTableProps): JSX.Element => {
	return (
		<>
			<div className="flow-root">
				<div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
					<div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
						<table
							aria-label="Email validation results"
							className="min-w-full divide-y divide-gray-300"
						>
							<thead>
								<tr>
									<th
										scope="col"
										className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:pl-0"
									>
										Email
									</th>
									<th
										scope="col"
										className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
									>
										DNS
									</th>
									<th
										scope="col"
										className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
									>
										Format
									</th>
									<th
										scope="col"
										className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
									>
										Disposable
									</th>
									<th
										scope="col"
										className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
									>
										Aliased
									</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-200">
								{results.map(({ alias, disposable, dns, email, format }) => (
									<tr key={email} aria-label={email}>
										<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
											{email}
										</td>
										<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
											{dns ? (
												<span title="Valid MX record">
													{LEGEND_VALUES.DNS_VALID}
												</span>
											) : (
												<span title="No valid MX record">
													{LEGEND_VALUES.DNS_INVALID}
												</span>
											)}
										</td>
										<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
											{format ? (
												''
											) : (
												<span title="Invalid email format">
													{LEGEND_VALUES.FORMAT_INVALID}
												</span>
											)}
										</td>
										<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
											{disposable ? (
												<span title="Known disposable address">
													{LEGEND_VALUES.DISPOSABLE}
												</span>
											) : (
												''
											)}
										</td>
										<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
											{alias ? (
												<span title="Is an aliased address">
													{LEGEND_VALUES.ALIAS}
												</span>
											) : (
												''
											)}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>

			<LookupResultsTableLegend />
		</>
	);
};
