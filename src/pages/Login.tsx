import React from 'react';
import SignIn from '../components/SignIn';

import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  return (
    <div className="flex flex-col items-center justify-center h-screen text-gray-300">
      <h1 className="text-3xl font-bold mb-8">Log in</h1>
      <span className="flex flex-row mb-4">
        Don't have an account?{' '}
        <Link to={'/join'} className="flex underline">
          Create one
        </Link>
      </span>

      <SignIn />
    </div>
  );
};

export default Login;
