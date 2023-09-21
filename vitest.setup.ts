import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

afterEach(() => {
	cleanup();
});

const fetchMock = vi.fn(() => {
	throw new Error(
		'Fetch not available in testing. You need to mock it in the test.',
	);
});

vi.stubGlobal('fetch', fetchMock);
