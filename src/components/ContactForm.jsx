import { httpsCallable } from 'firebase/functions';
import React, { useRef, useState } from 'react';
import { functions } from '../firebase/firebase';

const ContactForm = () => {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [text, setText] = useState('');

  const emailInput = useRef();
  const subjectInput = useRef();
  const textInput = useRef();

  function handleFormSubmit(e) {
    e.preventDefault();
    const sendEmail = httpsCallable(functions, 'sendEmail');
    sendEmail({ email: email, subject: subject, message: text })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });

    setEmail('');
    setSubject('');
    setText('');
  }
  return (
    <section className='contact-form-component pt-5 pb-5'>
      <h1>Contactati-ne completand formularul de mai jos</h1>
      <form onSubmit={handleFormSubmit}>
        <div className='mb-3'>
          <label htmlFor='email' className='form-label'>
            Email
          </label>
          <input
            type='email'
            name='email'
            id='email'
            autoComplete='on'
            ref={emailInput}
            className='form-control'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='subject' className='form-label'>
            Subiect
          </label>
          <input
            type='text'
            name='subiect'
            id='subject'
            autoComplete='on'
            ref={subjectInput}
            className='form-control'
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='text' className='form-label'>
            Mesajul dumneavoastra
          </label>
          <textarea
            type='text'
            name='text'
            id='text'
            autoComplete='on'
            ref={textInput}
            className='form-control'
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          ></textarea>
        </div>
        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </form>
    </section>
  );
};

export default ContactForm;
