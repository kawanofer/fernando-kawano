'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

interface UseLoadingStateOptions {
  initialState?: boolean;
  minLoadingTime?: number; // Minimum time to show loading (prevents flash)
}

interface LoadingState {
  isLoading: boolean;
  error: Error | null;
  setLoading: (loading: boolean) => void;
  setError: (error: Error | null) => void;
  clearError: () => void;
  executeAsync: <T>(asyncFn: () => Promise<T>) => Promise<T | null>;
}

export const useLoadingState = (
  options: UseLoadingStateOptions = {}
): LoadingState => {
  const { initialState = false, minLoadingTime = 0 } = options;

  const [isLoading, setIsLoading] = useState(initialState);
  const [error, setError] = useState<Error | null>(null);
  const loadingStartTime = useRef<number | null>(null);

  const setLoading = useCallback((loading: boolean) => {
    if (loading) {
      loadingStartTime.current = Date.now();
      setError(null); // Clear error when starting new operation
    }
    setIsLoading(loading);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const executeAsync = useCallback(
    async <T>(asyncFn: () => Promise<T>): Promise<T | null> => {
      try {
        setLoading(true);
        const result = await asyncFn();

        // Ensure minimum loading time if specified
        if (minLoadingTime > 0 && loadingStartTime.current) {
          const elapsed = Date.now() - loadingStartTime.current;
          if (elapsed < minLoadingTime) {
            await new Promise(resolve =>
              setTimeout(resolve, minLoadingTime - elapsed)
            );
          }
        }

        setLoading(false);
        return result;
      } catch (err) {
        const error =
          err instanceof Error ? err : new Error('An unknown error occurred');
        setError(error);
        setLoading(false);
        return null;
      }
    },
    [setLoading, minLoadingTime]
  );

  return {
    isLoading,
    error,
    setLoading,
    setError,
    clearError,
    executeAsync,
  };
};

// Hook for managing multiple loading states
interface UseMultipleLoadingStatesOptions {
  initialStates?: Record<string, boolean>;
}

export const useMultipleLoadingStates = (
  options: UseMultipleLoadingStatesOptions = {}
) => {
  const { initialStates = {} } = options;
  const [loadingStates, setLoadingStates] =
    useState<Record<string, boolean>>(initialStates);

  const setLoading = useCallback((key: string, loading: boolean) => {
    setLoadingStates(prev => ({
      ...prev,
      [key]: loading,
    }));
  }, []);

  const isAnyLoading = useCallback(() => {
    return Object.values(loadingStates).some(Boolean);
  }, [loadingStates]);

  const getLoadingState = useCallback(
    (key: string) => {
      return loadingStates[key] || false;
    },
    [loadingStates]
  );

  return {
    loadingStates,
    setLoading,
    isAnyLoading,
    getLoadingState,
  };
};

// Hook for timeout-based loading states
export const useTimedLoading = (duration: number = 2000) => {
  const [isLoading, setIsLoading] = useState(false);

  const startLoading = useCallback(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return {
    isLoading,
    startLoading,
  };
};
