"use client";
const storage = typeof window !== "undefined" ? window.localStorage : null;

interface SaveToLocalStorageProps {
  key: string;
  value: any;
}

export const saveToLocalStorage = ({
  key,
  value,
}: SaveToLocalStorageProps): void => {
  try {
    const jsonValue = JSON.stringify(value);
    storage?.setItem(key, jsonValue);
  } catch (e) {
    console.error("Failed to save:", e);
  }
};

interface GetFromLocalStorageProps {
  key: string;
  cb?: (value: any) => void;
}

export const getFromLocalStorage = ({
  key,
  cb = () => null,
}: GetFromLocalStorageProps): void => {
  try {
    const value = storage?.getItem(key);
    if (value) {
      if (typeof cb === "function") cb(JSON.parse(value));
    }
  } catch (e) {
    console.error("Failed to fetch:", e);
  }
};

interface DeleteFromLocalStorageProps {
  key: string;
}

export const deleteFromLocalStorage = ({
  key,
}: DeleteFromLocalStorageProps): void => {
  try {
    storage?.removeItem(key);
  } catch (e) {
    console.error("Failed to delete:", e);
  }
};
