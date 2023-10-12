import React from 'react';
import { storage } from '../firebase/firebase';
import { ref, getDownloadURL } from 'firebase/storage';
import { Helmet } from 'react-helmet-async';

const Contact = () => {
  getDownloadURL(ref(storage, 'appAssets/heading-image.jpg'))
    .then((url) => {})
    .catch((error) => {
      console.log(error);
    });

  return (
    <>
      <Helmet>
        <title>Contact - Gradina La Luca</title>
      </Helmet>
      <div style={{ marginTop: '60px' }}>
        <h1>Contact page</h1>
      </div>
    </>
  );
};

export default Contact;
