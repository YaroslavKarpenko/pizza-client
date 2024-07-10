import { ComponentPropsWithoutRef, FC } from 'react';
import { useDrawerContext } from './DrawerProvider';
import useClickOutside from '../../../hooks/useClickOutside';
import classNames from 'classnames';

interface DrawerContentProps extends ComponentPropsWithoutRef<'div'> {}

const DrawerContent: FC<DrawerContentProps> = ({ children, className, ...rest }) => {
  const { open, onClose } = useDrawerContext();
  const ref = useClickOutside(onClose);
  if (!open) return null;

  return (
    <div
      {...rest}
      ref={ref}
      className={classNames(
        `fixed top-0 left-0 h-full bg-sky-600 dark:bg-indigo-950 z-50 transition-transform transform duration-300 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`,
        className,
      )}>
      {children}
    </div>
  );
};

export default DrawerContent;
