import * as React from 'react';

const LazyContext = React.createContext({});

const useLazy = () => {
  const context = React.useContext(LazyContext);

  if (context === undefined) {
    throw new Error('useLazy was used outside of its react-lazy-io Provider');
  }

  return context;
};

const LazyContextProvider = ({ children }: any) => {
  return <LazyContext.Provider value={{}}>{children}</LazyContext.Provider>;
};

export { useLazy, LazyContextProvider };
