import React from 'react';
import SignUp from '../components/SignUp';

import { Link } from 'react-router-dom';

const JoinUs: React.FC = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  return (
    <div className="flex flex-col items-center justify-center h-screen text-gray-300">
      <h1 className="text-3xl font-bold mb-8">Create an acconut</h1>
      <span className="flex flex-row mb-4">
        Already have an account?{' '}
        <Link to={'/login'} className="flex underline">
          Log in
        </Link>
      </span>
      <SignUp />
    </div>
  );
};

export default JoinUs;
