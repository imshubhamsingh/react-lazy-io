import * as React from 'react';
import { IAddItem, LazyContextProvider } from './Lazy.context';
import { generateObserver, observer } from './observer';

export type ILazyContainer = {
  children: React.ReactElement;
  as?: keyof JSX.IntrinsicElements;
  options: IntersectionObserverInit;
};

function LazyContainer({ children, as, options }: ILazyContainer) {
  const Tag = as || 'div';
  const ref = React.useRef(generateObserver({ options }));

  const addItem: IAddItem = (node, callback) => {
    return observer({ ...ref.current, node, callback });
  };

  React.useEffect(() => {
    const props = generateObserver({ options });
    ref.current = props;

    return () => {
      ref.current.observer.disconnect();
    };
  }, [options]);

  return (
    <LazyContextProvider addItem={addItem}>
      <Tag>{children}</Tag>
    </LazyContextProvider>
  );
}

export default LazyContainer;
