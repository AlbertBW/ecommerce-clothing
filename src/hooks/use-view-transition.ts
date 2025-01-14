import { useCallback } from "react";
import { flushSync } from "react-dom";

export default function useViewTransition() {
  const startViewTransition = useCallback((callback: () => void) => {
    if (document.startViewTransition) {
      document.startViewTransition(() =>
        flushSync(() => {
          callback();
        })
      );
    } else {
      callback();
    }
  }, []);

  return [startViewTransition];
}
