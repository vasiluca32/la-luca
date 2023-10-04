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
        <meta property='og:title' content='Contact - Gradina La Luca' />
        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://la-luca.web.app/contact' />
        <meta
          property='og:image'
          content='https://firebasestorage.googleapis.com/v0/b/la-luca.appspot.com/o/appAssets%2Fheading-image.jpg?alt=media&token=56d8a9bb-98c6-484c-81bb-3c270c835fa6'
        />
      </Helmet>
      <div style={{ marginTop: '60px' }}>
        <h1>Contact page</h1>
      </div>
    </>
  );
};

export default Contact;
