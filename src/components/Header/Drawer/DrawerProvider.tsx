import { createContext, useContext, useState } from 'react';

interface DrawerContextProps {
  open: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export const DrawerContext = createContext<DrawerContextProps>(null!);

export const useDrawerContext = () => {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error('No drawer context found!');
  }
  return context;
};

interface DrawerProviderProps {
  children: React.ReactNode;
}

export const DrawerProvider: React.FC<DrawerProviderProps> = ({ children }) => {
  const [open, setOpen] = useState(false);

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  return (
    <DrawerContext.Provider value={{ open, onOpen, onClose }}>
      {children}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md z-40 duration-300"
          onClick={onClose}
        />
      )}
    </DrawerContext.Provider>
  );
};
