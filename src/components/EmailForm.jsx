import React, { useRef, useState } from 'react';

// use the below props in the component where you want to use EmailForm

// email={email}
// setEmail={setEmail}
// handleSubmit={handleSubmit}
// message={emailSent ? 'Email sent' : ''}
const EmailForm = ({ email, setEmail, handleSubmit, message, buttonText }) => {
  const [emailSent, setEmailSent] = useState(false);
  const emailInput = useRef();
  function handleFormSubmit(e) {
    e.preventDefault();
    emailInput.current.value = '';
    handleSubmit();
    setEmailSent(true);
    setTimeout(() => {
      setEmailSent(false);
    }, 3000);
  }
  return (
    <div className='container pt-5 pb-5'>
      <form onSubmit={handleFormSubmit}>
        <div className='mb-3'>
          <label htmlFor='email' className='form-label'>
            Email address
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
        <button
          type='submit'
          className='btn btn-primary'
          disabled={email ? false : true}
        >
          {buttonText ? buttonText : 'Submit'}
        </button>
        {emailSent && message ? <p>{message}</p> : ''}
      </form>
    </div>
  );
};

export default EmailForm;
