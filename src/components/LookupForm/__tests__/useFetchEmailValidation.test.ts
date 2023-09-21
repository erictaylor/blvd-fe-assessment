import { renderHook } from '@testing-library/react';
import { Mock, describe, expect, it, vi } from 'vitest';
import { useFetchEmailValidation } from '../useFetchEmailValidation';
import { fetchEmailValidation } from '../utils';

vi.mock('../utils.ts', () => {
	return {
		fetchEmailValidation: vi
			.fn<
				Parameters<typeof fetchEmailValidation>,
				ReturnType<typeof fetchEmailValidation>
			>()
			.mockRejectedValue(new Error('Mocked rejected error. Safe to ignore.')),
	};
});

const mockedFetchEmailValidation = fetchEmailValidation as Mock<
	Parameters<typeof fetchEmailValidation>,
	ReturnType<typeof fetchEmailValidation>
>;

describe('useFetchEmailValidation', () => {
	it('should return a getEmailValidation function and boolean indicating fetch status', async () => {
		const onAddToResponses = vi.fn();

		const { result } = renderHook(() =>
			useFetchEmailValidation(onAddToResponses),
		);

		expect(result.current[0]).toBeInstanceOf(Function);
		expect(result.current[1]).toBe(false);
	});

	// Skipped - Something isn't working as expected in this test and I'm not sure why.
	// Given more time I'm sure it could be sorted.
	it('should alert and console.error when fetchEmailValidation throws an error', async () => {
		vi.useFakeTimers();

		const onAddToResponses = vi.fn();

		const consoleErrorSpy = vi.spyOn(window.console, 'error');

		const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

		const { result } = renderHook(() =>
			useFetchEmailValidation(onAddToResponses),
		);

		result.current[0]('invalid email');

		await vi.runAllTimersAsync();

		expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
		expect(consoleErrorSpy).toHaveBeenCalledWith(expect.any(Error));

		expect(alertSpy).toHaveBeenCalledTimes(1);
		expect(alertSpy).toHaveBeenCalledWith(
			'Something went wrong. Please try again later.',
		);

		expect(onAddToResponses).not.toHaveBeenCalled();
	});

	it('should call onAddToResponses when fetchEmailValidation is successful', async () => {
		vi.useFakeTimers();
		mockedFetchEmailValidation.mockResolvedValueOnce({
			dns: true,
			format: true,
		});

		const onAddToResponses = vi.fn();

		const { result } = renderHook(() =>
			useFetchEmailValidation(onAddToResponses),
		);

		result.current[0]('eric@daxos.com');

		await vi.runAllTimersAsync();

		expect(onAddToResponses).toHaveBeenCalledOnce();
		expect(onAddToResponses).toHaveBeenCalledWith({
			dns: true,
			email: 'eric@daxos.com',
			format: true,
		});
	});
});
