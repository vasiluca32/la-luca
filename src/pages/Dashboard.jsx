import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import EmailForm from '../components/EmailForm';
import { httpsCallable } from 'firebase/functions';
import { functions } from '../firebase/firebase';

const Dashboard = () => {
  const [email, setEmail] = useState('');
  function handleSubmit() {
    const addAdmin = httpsCallable(functions, 'addAdminRole');
    addAdmin({ email: email })
      .then((result) => {
        // const data = JSON.parse(result);
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <>
      <Helmet>
        <title>Dashboard - Gradina La Luca</title>
      </Helmet>
      <div className='page-wrapper' style={{ marginTop: '60px' }}>
        <EmailForm
          email={email}
          setEmail={setEmail}
          handleSubmit={handleSubmit}
        />
      </div>
    </>
  );
};

export default Dashboard;
