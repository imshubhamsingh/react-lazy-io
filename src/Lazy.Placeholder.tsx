import * as React from 'react';
export interface ILazyPlaceholderProps
  extends React.HTMLAttributes<HTMLOrSVGElement> {
  as: keyof JSX.IntrinsicElements;
}

function LazyPlaceHolder({
  as = 'div',
  children,
  ...props
}: ILazyPlaceholderProps) {
  const Tag = as || 'div';
  return <Tag {...props}>{children}</Tag>;
}

export default LazyPlaceHolder;
