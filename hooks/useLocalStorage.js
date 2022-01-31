import React from "react";
export const useLocalStorage = (key, defaultKey = false) => {
  const [state, setState] = React.useState(
    (defaultKey && window.localStorage.getItem(key)) || defaultKey
  );

  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  React.useEffect(() => {
    setState(window.localStorage.getItem(key) || defaultKey);
  }, [defaultKey, key]);

  return [state, setState];
};
