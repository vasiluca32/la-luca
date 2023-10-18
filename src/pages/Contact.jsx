import React from 'react';
import { storage } from '../firebase/firebase';
import { ref, getDownloadURL } from 'firebase/storage';
import { Helmet } from 'react-helmet-async';
import ContactForm from '../components/ContactForm';

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
      <main>
        <div className='container'>
          <ContactForm />
        </div>
      </main>
    </>
  );
};

export default Contact;
