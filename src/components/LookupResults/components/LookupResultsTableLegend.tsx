export const LookupResultsTableLegend = (): JSX.Element => {
	return (
		<div className="mt-8 w-full border-t border-gray-300 pt-8 text-xs text-gray-400">
			<ul>
				<li className="py-1">✅ = DNS has valid MX records</li>
				<li className="py-1">⛔️ = DNS does not have valid MX records</li>
				<li className="py-1">👎 = Not a valid email format</li>
				<li className="py-1">🚮 = Email is known as disposable</li>
			</ul>
		</div>
	);
};
