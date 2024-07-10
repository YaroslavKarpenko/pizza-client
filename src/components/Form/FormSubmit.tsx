import React from 'react';

interface FormSubmitProps extends React.ComponentPropsWithoutRef<'button'> {}

const FormSubmit: React.FC<FormSubmitProps> = ({ children, ...rest }) => {
  return (
    <button type="submit" {...rest} className="submit-class">
      {children}
    </button>
  );
};

export default FormSubmit;
