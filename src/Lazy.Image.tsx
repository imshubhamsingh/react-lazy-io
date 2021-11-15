import * as React from 'react';
import { useLazyItem } from './Lazy.Item';
import LazyPlaceHolder from './Lazy.Placeholder';

export type ILazyImageProps = {
  /**
   * Item React children
   */
  children: React.ReactElement;
  /**
   * Tag name for the DOM node added by Item
   */
  as?: keyof JSX.IntrinsicElements;
  /**
   * Default Image height
   */
  height?: number;
  /**
   * Default Image width
   */
  width?: number;
  /**
   * Image source URL
   */
  src: string;
  /**
   * Image source URL
   */
  alt: string;
  /**
   * transition duration in seconds
   */
  transitionDuration: number;
  /**
   * transition duration in seconds
   */
  position: string;
};

function LazyImage({
  as,
  src,
  transitionDuration = 0.7,
  children,
  height,
  width,
  alt,
  position,
  ...restProps
}: ILazyImageProps) {
  const Tag = as || 'figure';
  const [isLoaded, setIsLoaded] = React.useState(false);

  const { ref, visible } = useLazyItem();

  const slots = {
    placeholder: null,
  };

  React.useEffect(() => {
    if (visible) {
      const image = new Image();
      /** image properties */
      image.src = src;
      image.style.opacity = '0';
      image.style.transitionProperty = 'opacity';
      image.style.transitionDuration = `${transitionDuration}s`;
      image.height = height || undefined;
      image.width = width || undefined;
      image.alt = alt || '';
      image.style.position = position || '';
      image.onload = () => {
        setIsLoaded(true);
        ref.current.append(image);
        setTimeout(() => {
          image.style.opacity = '1';
        }, 0);
      };
    }
  }, [visible, src, transitionDuration, height, width, alt, ref, position]);

  React.Children.forEach(children, (child) => {
    switch (child.type) {
      case LazyPlaceHolder: {
        slots.placeholder = child;
        break;
      }
      default: {
      }
    }
  });

  return (
    //@ts-ignore TODO: see if this can be fixed
    <Tag {...restProps} ref={ref}>
      {!isLoaded && slots.placeholder}
    </Tag>
  );
}

export default LazyImage;
