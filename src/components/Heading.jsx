import React from 'react';

const Heading = () => {
  return (
    <section
      className='heading-component bg-lighter d-flex align-items-center'
      style={{ height: '100vh' }}
    >
      <div className='container text-center'>
        <h1 data-aos='fade-right' data-aos-duration='400'>
          Heading component
        </h1>
        <p data-aos='fade-left' data-aos-duration='400'>
          Just go to Login, nothing else to view here for the moment...
        </p>
      </div>
    </section>
  );
};

export default Heading;
