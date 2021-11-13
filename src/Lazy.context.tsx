import * as React from 'react';
import { IObserverCallback } from './observer';

export type IAddItem = (
  node: Element,
  callback: IObserverCallback,
) => () => void;

type ILazyContextProvider = {
  children: React.ReactNode;
  addItem: IAddItem;
};

const LazyContext = React.createContext<{
  addItem: IAddItem;
}>({ addItem: () => () => console.log });

const useLazy = () => {
  const context = React.useContext(LazyContext);

  if (context === undefined) {
    throw new Error('useLazy was used outside of its react-lazy-io Provider');
  }

  return context;
};

const LazyContextProvider = ({ children, addItem }: ILazyContextProvider) => {
  return (
    <LazyContext.Provider value={{ addItem }}>{children}</LazyContext.Provider>
  );
};

export { useLazy, LazyContextProvider };
