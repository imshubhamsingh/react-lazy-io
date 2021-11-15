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

type LazyItemOptions = {
  /**
   * Control default visibility; default is set to false
   */
  defaultVisibility?: boolean;
  /**
   * Callback when then visibility change to true
   */
  onChange?: () => void;
};

/**
 * React hook for LazyItem for more granular control.
 */
export function useLazyItem({ defaultVisibility, onChange }: LazyItemOptions) {
  const [visible, setVisible] = React.useState(defaultVisibility ?? false);
  const ref = React.useRef<Element>(null);

  const { addItem } = useLazy();
  const _unobserve = React.useRef<() => void>(() => console.log);

  const onVisible = React.useCallback(
    (inViewPort: boolean) => {
      if (inViewPort) {
        setVisible(true);
        onChange?.();
        _unobserve.current();
      }
    },
    [onChange],
  );

  React.useEffect(() => {
    _unobserve.current = addItem(ref.current, onVisible);

    return () => {
      _unobserve.current();
    };
  }, [addItem, onVisible, ref]);

  return { visible, ref };
}

function LazyItem({
  as,
  children,
  defaultVisibility,
  changeWhen = (visible) => visible,
}: ILazyItemProps) {
  const Tag = as || 'div';
  const { visible, ref } = useLazyItem({ defaultVisibility });

  const slots = {
    placeholder: null,
    rest: [],
  };

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
    <Tag ref={ref}>{changeWhen(visible) ? slots.rest : slots.placeholder}</Tag>
  );
}

export default LazyItem;
