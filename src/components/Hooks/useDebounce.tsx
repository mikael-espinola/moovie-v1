import { useRef } from "react";

const useDebounce = <T extends (...args: any[]) => void>(
  fn: T,
  delay: number
) => {
  const timeoutRef = useRef<number | undefined>(undefined);
  let debounceFunction = (...args: Parameters<T>) => {
    window.clearInterval(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      fn(...args);
    }, delay);
  };

  return debounceFunction;
};

export default useDebounce;
