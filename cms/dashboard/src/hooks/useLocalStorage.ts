import { useState } from "react";

type SetValue = (newValue: any) => void;

export const useLocalStorage = <T>(
    keyName: string,
    defaultValue: T
): [T, SetValue] => {
    const [storedValue, setStoredValue] = useState<T>(() => {
        console.log(keyName);
        try {
            const value = window.localStorage.getItem(keyName);
            if (value) {
                return JSON.parse(value);
            } else {
                window.localStorage.setItem(
                    keyName,
                    JSON.stringify(defaultValue)
                );
                return defaultValue;
            }
        } catch (err) {
            window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
            return defaultValue;
        }
    });

    const setValue: SetValue = (newValue: T) => {
        try {
            window.localStorage.setItem(keyName, JSON.stringify(newValue));
        } catch (err) {}

        setStoredValue(newValue);
    };
    return [storedValue, setValue];
};
