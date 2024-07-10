import { ComponentPropsWithoutRef, FC } from 'react';
import { usePopoverContext } from './PopoverProvider';
// import { useClickAway } from 'react-use';
import useClickOutside from '../../hooks/useClickOutside';
import classNames from 'classnames';

interface PopoverListProps extends ComponentPropsWithoutRef<'div'> {
  show?: boolean;
}

const PopoverList: FC<PopoverListProps> = ({ children, className, ...rest }) => {
  const props = usePopoverContext();
  const ref = useClickOutside(props.onClose);
  if (!props.open) return null;

  return (
    <div
      {...rest}
      ref={ref}
      className={classNames(
        'flex flex-col rounded-lg bg-gray-200 dark:bg-gray-500 dark:text-gray-400 font-normal text-lg p-2 gap-2 items-center justify-center shadow-lg',
        className,
      )}>
      {children}
    </div>
  );
};

export default PopoverList;
