import { useState, useEffect, useCallback } from "react";

/**
 * useLocalStorage
 * @param {string} key - localStorage key
 * @param {any|Function} initialValue - initial value or a function that returns the initial value (lazy)
 * @returns [value, setValue, removeValue]
 */
export default function useLocalStorage(key, initialValue) {
  // Security
  const isWindowAvailable = typeof window !== "undefined";

  // Lazy initializer
  const readValue = useCallback(() => {
    try {
      if (!isWindowAvailable) return typeof initialValue === "function" ? initialValue() : initialValue;
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : (typeof initialValue === "function" ? initialValue() : initialValue);
    } catch (err) {
      console.warn(`useLocalStorage: Error reading key "${key}" from localStorage:`, err);
      return typeof initialValue === "function" ? initialValue() : initialValue;
    }
  }, [key, initialValue, isWindowAvailable]);

  const [storedValue, setStoredValue] = useState(readValue);

  // setValue function
  const setValue = useCallback(
    (value) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        if (isWindowAvailable) {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
          // Dispatch a custom event to notify same-tab listeners
          window.dispatchEvent(new Event("local-storage"));
        }
      } catch (err) {
        console.warn(`useLocalStorage: Error setting key "${key}" in localStorage:`, err);
      }
    },
    [key, isWindowAvailable, storedValue]
  );

  // remove helper
  const remove = useCallback(() => {
    try {
      if (!isWindowAvailable) return;
      window.localStorage.removeItem(key);
      setStoredValue(typeof initialValue === "function" ? initialValue() : initialValue);
      window.dispatchEvent(new Event("local-storage"));
    } catch (err) {
      console.warn(`useLocalStorage: Error removing key "${key}" from localStorage:`, err);
    }
  }, [key, initialValue, isWindowAvailable]);

  //sync between tabs
  useEffect(() => {
    if (!isWindowAvailable) return;

    const handleStorage = (event) => {
      if (!event) return;
      // Event key filter
      if (event.key && event.key !== key) return;
      try {
        setStoredValue(readValue());
      } catch (err) {
        console.warn("useLocalStorage: storage event handler error", err);
      }
    };

    const handleCustomEvent = () => {
      setStoredValue(readValue());
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener("local-storage", handleCustomEvent);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("local-storage", handleCustomEvent);
    };
  }, [key, readValue, isWindowAvailable]);

  return [storedValue, setValue, remove];
}
