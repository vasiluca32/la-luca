import React from 'react';
import './styles/Heading.scss';

const Heading = () => {
  return (
    <section
      className='heading-component d-flex align-items-center'
      style={{ height: '100vh', paddingTop: '60px' }}
    >
      <div className='container text-white'>
        <div className='col-12 col-sm-6 text-left'>
          <h1
            className='header-1'
            data-aos='fade-right'
            data-aos-duration='400'
          >
            Gradina La Luca
          </h1>
          <p data-aos='fade-left' data-aos-duration='400'>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit
            quidem dignissimos, assumenda minima itaque odio ut exercitationem
            deleniti. Obcaecati, ea.
          </p>
          <button type='button' className='btn btn-secondary'>
            Lorem
          </button>
        </div>
      </div>
    </section>
  );
};

export default Heading;
