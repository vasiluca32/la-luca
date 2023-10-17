import React from 'react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Helmet } from 'react-helmet-async';
import EmailForm from '../components/shared/EmailForm';

const LogIn = () => {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const { signUp } = useAuth();

  function handleSubmit() {
    signUp(email);
    setEmail('');
    setEmailSent(true);
  }
  return (
    <>
      <Helmet>
        <title>Login - Gradina La Luca</title>
      </Helmet>
      <div className='page-wrapper' style={{ marginTop: '60px' }}>
        <EmailForm
          email={email}
          setEmail={setEmail}
          handleSubmit={handleSubmit}
          message={emailSent ? 'Email sent' : ''}
        />
      </div>
    </>
  );
};

export default LogIn;
