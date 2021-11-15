import * as React from 'react';
import { IAddItem, LazyContextProvider } from './Lazy.context';
import { generateObserver, Observer, observer } from './observer';

export type ILazyContainerProps = {
  /**
   * Container React children
   */
  children: React.ReactElement;
  /**
   * Tag name for the DOM node added by container
   */
  as?: keyof JSX.IntrinsicElements;
  /**
   * Intersection Observer options
   */
  options: IntersectionObserverInit;
};

function LazyContainer({ children, as, options }: ILazyContainerProps) {
  const Tag = as || 'div';
  const ref = React.useRef<Observer>();

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
