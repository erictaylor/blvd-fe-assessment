import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useResultsState } from '../useResultsState';

describe('useResultsState', () => {
	it('should return a results array and a function to add results', () => {
		const { result } = renderHook(() => useResultsState());

		expect(result.current[0]).toBeInstanceOf(Array);
		expect(result.current[1]).toBeInstanceOf(Function);
	});

	it('should add results to the beginning of the results array', () => {
		const { result } = renderHook(() => useResultsState());

		expect(result.current[0]).toEqual([]);

		act(() => {
			result.current[1]({
				email: 'eric@daxos.com',
				format: true,
			});
		});

		expect(result.current[0]).toEqual([
			{
				email: 'eric@daxos.com',
				format: true,
			},
		]);

		act(() => {
			result.current[1]({
				email: 'eric+alias@daxos.com',
				format: true,
			});
		});

		expect(result.current[0]).toEqual([
			{
				email: 'eric+alias@daxos.com',
				format: true,
			},
			{
				email: 'eric@daxos.com',
				format: true,
			},
		]);
	});

	it('should remove duplicates for the same email address', () => {
		const { result } = renderHook(() => useResultsState());

		expect(result.current[0]).toEqual([]);

		act(() => {
			result.current[1]({
				email: 'eric@daxos.com',
				format: true,
			});

			result.current[1]({
				email: 'eric+alias@daxos.com',
				format: true,
			});
		});

		expect(result.current[0]).toEqual([
			{
				email: 'eric+alias@daxos.com',
				format: true,
			},
			{
				email: 'eric@daxos.com',
				format: true,
			},
		]);

		act(() => {
			result.current[1]({
				email: 'eric@daxos.com',
				format: true,
			});
		});

		expect(result.current[0]).toHaveLength(2);
		expect(result.current[0][0]?.email).toBe('eric@daxos.com');
	});
});
