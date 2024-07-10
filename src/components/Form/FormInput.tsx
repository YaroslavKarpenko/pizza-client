import React from 'react';
import { FormContext } from './FormProvider';

interface FormInputProps extends React.ComponentPropsWithoutRef<'input'> {
  name: string;
}

const FormInput: React.FC<FormInputProps> = ({ name, ...rest }) => {
  const formContext = React.useContext(FormContext);

  if (!formContext) {
    throw new Error('FormInput must be used within a FormProvider');
  }

  const { values, setFieldValue } = formContext;

  return (
    <input
      {...rest}
      name={name}
      value={values[name] || ''}
      onChange={(e) => setFieldValue(name, e.target.value)}
      className="input-class"
    />
  );
};

export default FormInput;
