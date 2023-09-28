import React from 'react';
import './styles/Carousel.scss';
import apples from '../assets/images/apples.jpg';
import pears from '../assets/images/pears.jpg';
import plums from '../assets/images/plums.jpg';

const Carousel = () => {
  return (
    <section className='carousel-component'>
      <div className='container pt-5 pb-5 d-flex flex-column justify-content-center align-items-center'>
        <h2 className='mb-5'>Discover our products</h2>
        <div id='carousel-1' className='carousel slide'>
          <div className='carousel-inner'>
            <div className='carousel-item active'>
              <img
                src={apples}
                className='d-block w-100'
                alt='Apples'
                width='1140'
                height='810'
                loading='lazy'
              />
            </div>
            <div className='carousel-item'>
              <img
                src={pears}
                className='d-block w-100'
                alt='Pears'
                width='1140'
                height='810'
                loading='lazy'
              />
            </div>
            <div className='carousel-item'>
              <img
                src={plums}
                className='d-block w-100'
                alt='Plums'
                width='1140'
                height='810'
                loading='lazy'
              />
            </div>
          </div>
          <button
            className='carousel-control-prev'
            type='button'
            data-bs-target='#carousel-1'
            data-bs-slide='prev'
          >
            <span
              className='carousel-control-prev-icon'
              aria-hidden='true'
            ></span>
            <span className='visually-hidden'>Previous</span>
          </button>
          <button
            className='carousel-control-next'
            type='button'
            data-bs-target='#carousel-1'
            data-bs-slide='next'
          >
            <span
              className='carousel-control-next-icon'
              aria-hidden='true'
            ></span>
            <span className='visually-hidden'>Next</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Carousel;
