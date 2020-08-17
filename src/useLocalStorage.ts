import { useState, useEffect } from "react";

function useLocalStorage<T>(
  name: string,
  defaultValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  let lsItem = localStorage.getItem(name);
  if (lsItem !== null) {
    defaultValue = JSON.parse(lsItem);
  }

  const [value, setValue] = useState<T>(defaultValue);

  useEffect(() => {
    localStorage.setItem(name, JSON.stringify(value));
  }, [name, value]);

  return [value, setValue];
}

export default useLocalStorage;
