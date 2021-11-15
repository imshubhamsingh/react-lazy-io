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
   * Control visibility logic
   */
  changeWhen?: (visibility: boolean) => boolean;
  /**
   * Control default visibility; default is set to false
   */
  defaultVisibility?: boolean;
};

function LazyItem({
  as,
  children,
  defaultVisibility,
  changeWhen = (visible) => visible,
}: ILazyItemProps) {
  const Tag = as || 'div';
  const { addItem } = useLazy();
  const nodeRef = React.useRef<Element>(null);
  const _unobserve = React.useRef<() => void>(() => console.log);
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
    _unobserve.current = addItem(nodeRef.current, onVisible);

    return () => {
      _unobserve.current();
    };
  }, [addItem]);

  React.Children.forEach(children, (child) => {
    switch (child.type) {
      case LazyPlaceHolder: {
        slots.placeholder = child;
        break;
      }
      default: {
        slots.rest.push(child);
      }
    }
  });

  return (
    //@ts-ignore TODO: see if this can be fixed
    <Tag ref={nodeRef}>
      {changeWhen(visible) ? slots.rest : slots.placeholder}
    </Tag>
  );
}

export default LazyItem;
