import { useCallback, useEffect, useState } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';

export function useFilterParams() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
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
      
      navigate(`${location.pathname}?${params.toString()}`);
    },
    [navigate, searchParams, location.pathname, mounted]
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
      
      navigate(`${location.pathname}?${params.toString()}`);
    },
    [navigate, searchParams, location.pathname, mounted]
  );

  return {
    getParam,
    getArrayParam,
    setParam,
    setArrayParam,
  };
} 