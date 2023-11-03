import React from 'react';
import './styles/Heading.scss';
import { Link } from 'react-router-dom';
import LoadingSpinner from './common/LoadingSpinner';

const Heading = (props) => {
  return (
    <section className='heading-component position-relative d-flex align-items-center'>
      <div className='image-wrapper position-absolute'>
        {props.data?.image ? (
          <img src={props.data?.image} alt='Landscape' />
        ) : (
          <LoadingSpinner />
        )}
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
