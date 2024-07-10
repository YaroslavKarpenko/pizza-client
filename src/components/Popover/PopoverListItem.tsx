import classNames from 'classnames';
import { ComponentPropsWithoutRef, FC } from 'react';
import { usePopoverContext } from './PopoverProvider';

interface PopoverListItemProps extends ComponentPropsWithoutRef<'button'> {}

const PopoverListItem: FC<PopoverListItemProps> = ({ onClick, className, children, ...rest }) => {
  const props = usePopoverContext();

  return (
    <button
      {...rest}
      onClick={(e) => {
        onClick?.(e);
        props.onClose();
      }}
      className={classNames(
        `flex px-2 text-black dark:hover:text-black rounded-lg cursor-pointer transition-all	duration-200	ease-in-out hover:bg-gray-300  dark:hover:bg-gray-400 `,
        className,
      )}>
      {children}
    </button>
  );
};

export default PopoverListItem;
