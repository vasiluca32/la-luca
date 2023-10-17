import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import EmailForm from '../components/shared/EmailForm';
import { httpsCallable } from 'firebase/functions';
import { functions } from '../firebase/firebase';

const Dashboard = () => {
  const [email, setEmail] = useState('');
  const [emailToRemoveAdmin, setEmailToRemoveAdmin] = useState('');
  const [appUsers, setAppUsers] = useState([]);

  function handleSubmit() {
    const addAdmin = httpsCallable(functions, 'addAdminRole');
    addAdmin({ email: email })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleRemoveAdmin() {
    const addAdmin = httpsCallable(functions, 'removeAdminRole');
    addAdmin({ email: emailToRemoveAdmin })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    const listUsers = httpsCallable(functions, 'listUsers');
    listUsers()
      .then((result) => {
        setAppUsers(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
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
          buttonText='Make admin'
        />
        <hr />
        <EmailForm
          email={emailToRemoveAdmin}
          setEmail={setEmailToRemoveAdmin}
          handleSubmit={handleRemoveAdmin}
          buttonText='Remove admin'
        />
        <hr />
        <div className='container table-responsive-md'>
          <table className='table table-striped'>
            <thead>
              <tr>
                <th scope='col'>#</th>
                <th scope='col'>Email</th>
                <th scope='col'>UID</th>
                <th scope='col'>Role</th>
              </tr>
            </thead>
            <tbody>
              {appUsers.map((element, index) => {
                return (
                  <tr key={element.uid}>
                    <th scope='row'>{index + 1}</th>
                    <td>{element.email}</td>
                    <td>{element.uid}</td>
                    <td>
                      {element.customClaims?.admin ? 'admin' : 'not admin'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
