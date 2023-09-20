import type { EmailData } from '../../../types';

interface LookupResultsTableProps {
	results: readonly EmailData[];
}

export const LookupResultsTable = ({
	results,
}: LookupResultsTableProps): JSX.Element => {
	return (
		<div className="flow-root">
			<div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
				<div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
					<table className="min-w-full divide-y divide-gray-300">
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
									DNS
								</th>
								<th
									scope="col"
									className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
								>
									Alias
								</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-200">
							{results.map(({ alias, disposable, dns, email, format }) => (
								<tr key={email}>
									<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
										{email}
									</td>
									<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
										{format ? '👍' : '👎'}
									</td>
									<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
										{disposable ? 'Yes' : 'No'}
									</td>
									<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
										{dns ? 'Verified' : 'Unverified'}
									</td>
									<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
										{alias ? 'Yes' : ''}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};
