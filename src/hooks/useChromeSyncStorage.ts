import { useState } from 'react';

export const useChromeSyncStorage = <T>(
  key: string,
  initialValue: T,
): [T | null, (value: T) => void] => {
  const LOCALSTORAGE_KEY = `opt::${key}`;
  const [value, setValue] = useState<T>(initialValue);

  const setChromeStorageValue = (value: T) => {
    chrome.storage.sync.set({ [key]: value });
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(value));
    setValue(value);
  };

  const getChromeStorageValue = () => {
    const localStorageItem = localStorage.getItem(LOCALSTORAGE_KEY);
    if (localStorageItem) return JSON.parse(localStorageItem);

    chrome.storage.sync.get([key], function (result) {
      if (result[key] && !value) {
        localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(value));
        setValue(value);
      }
    });

    return value;
  };

  const chromeStorageValue = getChromeStorageValue();
  return [chromeStorageValue, setChromeStorageValue];
};
