import { useCallback, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export function useFilterParams() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);

  // Set mounted to true after the component is mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  const getParam = useCallback(
    (key: string): string | null => {
      if (!mounted) return null;
      return searchParams.get(key);
    },
    [searchParams, mounted]
  );

  const getArrayParam = useCallback(
    (key: string): string[] => {
      if (!mounted) return [];
      const param = searchParams.get(key);
      if (!param) return [];
      return param.split(',');
    },
    [searchParams, mounted]
  );

  const setParam = useCallback(
    (key: string, value: string | null) => {
      if (!mounted) return;
      
      const params = new URLSearchParams(searchParams.toString());
      
      if (value === null || value === '') {
        params.delete(key);
      } else {
        params.set(key, value);
      }
      
      router.push(`?${params.toString()}`);
    },
    [router, searchParams, mounted]
  );

  const setArrayParam = useCallback(
    (key: string, values: string[]) => {
      if (!mounted) return;
      
      const params = new URLSearchParams(searchParams.toString());
      
      if (values.length === 0) {
        params.delete(key);
      } else {
        params.set(key, values.join(','));
      }
      
      router.push(`?${params.toString()}`);
    },
    [router, searchParams, mounted]
  );

  return {
    getParam,
    getArrayParam,
    setParam,
    setArrayParam,
  };
} 