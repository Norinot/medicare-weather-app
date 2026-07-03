import { renderHook, act } from '@testing-library/react';
import { useLocalStorageState } from './useLocalStorageState';
import { describe, beforeEach, it, expect } from 'vitest';

describe('useLocalStorageState', () => {
  const storageKey = 'test-key';

  beforeEach(() => {
    window.localStorage.clear();
  });

  it('reads initial value when storage is empty', () => {
    const { result } = renderHook(() => useLocalStorageState(storageKey, 'default'));

    expect(result.current[0]).toBe('default');
  });

  it('reads value from localStorage when available', () => {
    window.localStorage.setItem(storageKey, JSON.stringify('stored-value'));
    const { result } = renderHook(() => useLocalStorageState(storageKey, 'default'));

    expect(result.current[0]).toBe('stored-value');
  });

  it('writes updates to localStorage', () => {
    const { result } = renderHook(() => useLocalStorageState(storageKey, 'default'));

    act(() => {
      result.current[1]('new-value');
    });

    expect(window.localStorage.getItem(storageKey)).toBe(JSON.stringify('new-value'));
    expect(result.current[0]).toBe('new-value');
  });

  it('removes item when state is null', () => {
    const { result } = renderHook(() => useLocalStorageState<string | null>(storageKey, 'default'));

    act(() => {
      result.current[1](null);
    });

    expect(window.localStorage.getItem(storageKey)).toBeNull();
    expect(result.current[0]).toBeNull();
  });
});
