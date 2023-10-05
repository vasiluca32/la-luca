import React from 'react';
import Heading from '../components/Heading';
// import Team from '../components/Team';
// import Testimonials from '../components/Testimonials';
import Carousel from '../components/Carousel';
import { Helmet } from 'react-helmet-async';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Gradina La Luca</title>
      </Helmet>
      <div className='page-wrapper' style={{ marginTop: '60px' }}>
        <Heading />
        <Carousel />
      </div>
      {/* <Team />
      <Testimonials /> */}
    </>
  );
};

export default Home;
