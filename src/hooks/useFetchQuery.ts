import { useQuery } from '@tanstack/react-query';

interface useFetchQueryProps<T> {
  queryKey: unknown[];
  staleTime?: number;
  gcTime?: number;
  queryFn: () => Promise<T>;
}

const DEFAULT_STALE_TIME = 1000 * 60 * 5; // 5분
const DEFAULT_GC_TIME = 1000 * 60 * 60; // 1시간

export const useFetchQuery = <T>({
  queryKey,
  staleTime,
  gcTime,
  queryFn,
}: useFetchQueryProps<T>) => {
  return useQuery({
    queryKey,
    queryFn: queryFn,
    retry: 1,
    staleTime: staleTime ?? DEFAULT_STALE_TIME,
    gcTime: gcTime ?? DEFAULT_GC_TIME,
  });
};
