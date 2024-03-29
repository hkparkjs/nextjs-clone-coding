import { useState, useEffect } from 'react';

//* debounce된 값을 return
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    }
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;