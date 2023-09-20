import { ReactNode } from 'react';

interface AppContainerProps {
	children: ReactNode;
}

/**
 * This component is the top-level container for the application
 * and applies some basic styling to the content.
 */
export const AppContainer = ({ children }: AppContainerProps): JSX.Element => {
	return <div className="mx-auto max-w-7xl px-4 py-12">{children}</div>;
};
