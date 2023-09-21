import { type PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
	testDir: 'tests',
	use: {
		baseURL: 'http://localhost:61000/',
	},
	webServer: {
		command: 'pnpm preview --port 61000 --strictPort true',
		reuseExistingServer: !process.env.CI,
		timeout: 4 * 1_000,
		url: 'http://localhost:61000/',
	},
};

export default config;
