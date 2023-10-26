import React from 'react';
import './styles/Heading.scss';
import { Link } from 'react-router-dom';

const Heading = (props) => {
  return (
    <section className='heading-component position-relative d-flex align-items-center'>
      <div className='image-wrapper position-absolute'>
        <img src={props.data?.image} alt='Landscape' />
      </div>
      <div className='position-relative col-12 col-sm-6 text-left text-white'>
        <h1 className='header-1'>{props.data?.title}</h1>
        <p>{props.data?.text}</p>
        <Link to='/contact' className='btn btn-secondary'>
          {props.data?.button.text}
        </Link>
      </div>
    </section>
  );
};

export default Heading;
