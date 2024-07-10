import React from 'react';

interface FormContextType {
  values: Record<string, any>;
  setFieldValue: (field: string, value: any) => void;
}

export const FormContext = React.createContext<FormContextType | undefined>(undefined);

interface FormProviderProps {
  children: React.ReactNode;
}

export const FormProvider: React.FC<FormProviderProps> = ({ children }) => {
  const [values, setValues] = React.useState<Record<string, any>>({});

  const setFieldValue = (field: string, value: any) => {
    setValues((prevValues) => ({ ...prevValues, [field]: value }));
  };

  return <FormContext.Provider value={{ values, setFieldValue }}>{children}</FormContext.Provider>;
};
