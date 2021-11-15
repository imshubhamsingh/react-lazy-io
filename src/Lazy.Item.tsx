import * as React from 'react';
import { useLazy } from './Lazy.context';
import LazyPlaceHolder from './Lazy.Placeholder';

export type ILazyItemProps = {
  /**
   * Item React children
   */
  children: React.ReactElement;
  /**
   * Tag name for the DOM node added by Item
   */
  as?: keyof JSX.IntrinsicElements;
  /**
   * Control default visibility; default is set to false
   */
  defaultVisibility?: boolean;
};

function LazyItem({ as, children, defaultVisibility }: ILazyItemProps) {
  const Tag = as || 'div';
  const { addItem } = useLazy();
  const nodeRef = React.useRef<typeof Tag>();
  const _unobserve = React.useRef(() => console.log);
  const [visible, setVisible] = React.useState(defaultVisibility ?? false);

  const slots = {
    placeholder: null,
    rest: [],
  };

  function onVisible(inViewPort: boolean) {
    if (inViewPort) {
      setVisible(true);
      _unobserve.current();
    }
  }

  React.useEffect(() => {
    // @ts-ignore TODO: fix this
    _unobserve.current = addItem(nodeRef.current, onVisible);

    return () => {
      _unobserve.current();
    };
  }, [addItem]);

  React.Children.forEach(children, (child) => {
    switch (child.type) {
      case LazyPlaceHolder: {
        // @ts-ignore TODO: fix this
        slots.placeholder = child;
        break;
      }
      default: {
        // @ts-ignore TODO: fix this
        slots.rest.push(child);
      }
    }
  });

  // @ts-ignore TODO: fix this
  return <Tag ref={nodeRef}>{visible ? slots.rest : slots.placeholder}</Tag>;
}

export default LazyItem;
