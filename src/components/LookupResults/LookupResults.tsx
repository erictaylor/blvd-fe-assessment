import type { EmailData } from '../../types';
import { LookupResultsEmpty } from './components/LookupResultsEmpty';
import { LookupResultsTable } from './components/LookupResultsTable';

interface LookupResultsProps {
	results: readonly EmailData[];
}

/**
 * Conditionally renders the LookupResultsTable or LookupResultsEmpty component
 * based on the `results` prop. If there are no results, the LookupResultsEmpty
 * component is rendered. Otherwise, the LookupResultsTable component is rendered.
 */
export const LookupResults = ({ results }: LookupResultsProps): JSX.Element => {
	return (
		<div className="mt-8 w-full border-t border-gray-300 pt-8">
			{results.length > 0 ? (
				<LookupResultsTable results={results} />
			) : (
				<LookupResultsEmpty />
			)}
		</div>
	);
};
