import * as React from 'react';
import LazyItem, { ILazyItemProps } from './Lazy.Item';
import LazyPlaceHolder from './Lazy.Placeholder';

function LazySuspense({ children, ...restProps }: ILazyItemProps) {
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
    <LazyItem {...restProps}>
      <>
        {slots.placeholder}
        <React.Suspense fallback={slots.placeholder}>
          {slots.rest}
        </React.Suspense>
      </>
    </LazyItem>
  );
}

export default LazySuspense;
