import { ComponentPropsWithoutRef, FC } from 'react';
import { useDrawerContext } from './DrawerProvider';
import classNames from 'classnames';

interface DrawerCloseButtonProps extends ComponentPropsWithoutRef<'button'> {}

const DrawerCloseButton: FC<DrawerCloseButtonProps> = ({
  children,
  className,
  onClick,
  ...rest
}) => {
  const { onClose } = useDrawerContext();
  return (
    <button
      {...rest}
      className={classNames('', className)}
      onClick={(e) => {
        onClick?.(e);
        onClose();
      }}>
      {children}
    </button>
  );
};

export default DrawerCloseButton;
