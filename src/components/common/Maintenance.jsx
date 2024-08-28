import React from 'react';
import maintenance from '../../assets/images/main-tools.png';
import '../styles/Maintenance.scss';

const Maintenance = () => {
  return (
    <main style={{ backgroundColor: 'white', height: '100%' }}>
      <div className='container'>
        <section className='maintenance-component d-flex flex-column justify-content-center align-items-center'>
          <h1 className='text-center'>
            Ne pare rau, site-ul este in mentenanta, revenim curand
          </h1>
          <img
            className='mnt-image'
            src={maintenance}
            alt='maintenance'
            width='300'
          />
        </section>
      </div>
    </main>
  );
};

export default Maintenance;
