import { ComponentPropsWithoutRef, FC } from 'react';
import { useDrawerContext } from './DrawerProvider';
import classNames from 'classnames';

interface DrawerButtonProps extends ComponentPropsWithoutRef<'button'> {}

const DrawerButton: FC<DrawerButtonProps> = ({ children, className, onClick, ...rest }) => {
  const { onOpen } = useDrawerContext();
  return (
    <button
      {...rest}
      className={classNames('', className)}
      onClick={(e) => {
        onClick?.(e);
        onOpen();
      }}>
      {children}
    </button>
  );
};

export default DrawerButton;
