function LazyPlaceHolder({ as, children, ...props }) {
  const Tag = as || 'div';
  return <Tag>{children}</Tag>;
}

export default LazyPlaceHolder;
