import React from "react";
export const useLocalStorage = (key, defaultKey = "") => {
  const [state, setState] = React.useState(() => {
      if (typeof window !== undefined) {
         return  window.localStorage.getItem(JSON.stringify(key)) || defaultKey;
        }
       return setState(null);
  });

  React.useEffect(() => {
     window.localStorage.setItem(key, JSON.parse(state));
  }, [key, state]);

  return [state, setState];
};
