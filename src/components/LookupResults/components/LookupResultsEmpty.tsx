/**
 * The empty state for the LookupResults component.
 */
export const LookupResultsEmpty = (): JSX.Element => {
	return (
		<div className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
			<span className="mt-2 block text-sm font-semibold text-gray-900">
				No results.
			</span>
		</div>
	);
};
