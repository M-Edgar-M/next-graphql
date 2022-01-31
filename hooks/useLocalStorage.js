import React from "react";
export const useLocalStorage = (key, defaultKey = "") => {
  const [state, setState] = React.useState('');

  React.useEffect(() => {
    window.localStorage.setItem(key, state);
  }, [key, state]);

  React.useEffect(() => {
    setState(!!window.localStorage.getItem(String(key)));
  }, [defaultKey, key]);

  return [state, setState];
};
