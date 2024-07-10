import classNames from 'classnames';
import React from 'react';
import { DrawerProvider } from './DrawerProvider';
import DrawerButton from './DrawerButton';
import DrawerContent from './DrawerContent';
import DrawerCloseButton from './DrawerCloseButton';

interface DrawerComponentProps extends React.ComponentPropsWithoutRef<'div'> {}

const DrawerComponent: React.FC<DrawerComponentProps> = ({ className, children, ...rest }) => {
  return (
    <DrawerProvider>
      <div {...rest} className={classNames('relative', className)}>
        {children}
      </div>
    </DrawerProvider>
  );
};

const Drawer = Object.assign(DrawerComponent, {
  Button: DrawerButton,
  Content: DrawerContent,
  CloseButton: DrawerCloseButton,
});

export default Drawer;
