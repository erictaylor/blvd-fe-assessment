import type { EmailData } from '../../types';
import { LookupResultsEmpty } from './components/LookupResultsEmpty';
import { LookupResultsTable } from './components/LookupResultsTable';

interface LookupResultsProps {
	results: readonly EmailData[];
}

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
