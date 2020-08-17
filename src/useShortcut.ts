import { useEffect, useCallback } from "react";
import Mousetrap from "mousetrap";

export default function useShortcut(
  keys: string | string[],
  cbk: (e: ExtendedKeyboardEvent, combo: string) => any,
  deps?: any[],
  action?: string
) {
  const callback = useCallback(cbk, deps || []);

  useEffect(() => {
    Mousetrap.bind(keys, callback, action);

    return () => {
      Mousetrap.unbind(keys);
    };
  }, [keys, callback, action]);
}
