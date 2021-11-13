import * as React from 'react';
interface LazyPlaceholderProps {
  as: keyof JSX.IntrinsicElements;
}

const LazyPlaceHolder: React.FunctionComponent<
  LazyPlaceholderProps & React.HTMLAttributes<HTMLOrSVGElement>
> = ({ as, children, ...props }) => {
  const Tag = as || 'div';
  return <Tag {...props}>{children}</Tag>;
};

export default LazyPlaceHolder;
