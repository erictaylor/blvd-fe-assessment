import react from '@vitejs/plugin-react-swc';
import { configDefaults, defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	test: {
		clearMocks: true,
		coverage: {
			exclude: ['src/**/*.snap', 'src/**/__fixtures__/**', 'tests/**/*'],
			include: ['src/**'],
			lines: 98,
			provider: 'istanbul',
			reporter: ['text', 'lcov'],
		},
		environment: 'jsdom',
		environmentOptions: {
			jsdom: {
				url: 'http://localhost',
			},
		},
		exclude: [...configDefaults.exclude, 'tests/**/*'],
		setupFiles: ['./vitest.setup.ts'],
	},
});
