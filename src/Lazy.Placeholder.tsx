import * as React from 'react';
type LazyPlaceholderProps = {
  as: keyof JSX.IntrinsicElements;
};

const LazyPlaceHolder: React.FunctionComponent<
  LazyPlaceholderProps & React.HTMLAttributes<HTMLOrSVGElement>
> = ({ as = 'div', children, ...props }) => {
  const Tag = as || 'div';
  return <Tag {...props}>{children}</Tag>;
};

export default LazyPlaceHolder;
