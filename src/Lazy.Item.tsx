import * as React from 'react';
import { useLazy } from './Lazy.context';
import LazyPlaceHolder from './Lazy.Placeholder';

export type ILazyItem = {
  children: React.ReactElement;
  as?: keyof JSX.IntrinsicElements;
  defaultVisibility?: boolean;
};

function LazyItem({ as, children, defaultVisibility }: ILazyItem) {
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
      console.log('in view');
      _unobserve.current();
    }
  }

  React.useEffect(() => {
    // @ts-ignore TODO: fix this
    _unobserve.current = addItem(nodeRef.current, onVisible);

    return () => {
      _unobserve.current();
    };
  }, []);

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

export default React.forwardRef(LazyItem);
