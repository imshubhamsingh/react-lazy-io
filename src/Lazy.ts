import LazyContainer from './Lazy.Container';
import LazyImage from './Lazy.Image';
import LazyItem, { useLazyItem } from './Lazy.Item';
import LazyPlaceHolder from './Lazy.Placeholder';

export const Lazy = {
  /**
   * Lazy Container - It adds single Intersection Observer for Items
   */
  Container: LazyContainer,
  /**
   * Lazy Item - It use nearest Lazy.Container's Intersection Observer to controll the visibility of its children
   */
  Item: LazyItem,
  /**
   * Lazy Placeholder - Anything children inside Placeholder is shown till the time nearest Lazy.Item visibility is false
   */
  Placeholder: LazyPlaceHolder,
  /**
   * Lazy image - A basic lazy loaded transition image by controlling opacity
   */
  Image: LazyImage,
};

export { useLazyItem };
