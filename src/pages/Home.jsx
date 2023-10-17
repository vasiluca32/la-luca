import React from 'react';
import Heading from '../components/Heading';
// import Team from '../components/Team';
import Testimonials from '../components/Testimonials';
import Carousel from '../components/Carousel';
import { Helmet } from 'react-helmet-async';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Home - Gradina La Luca</title>
      </Helmet>

      <main>
        <Heading />
        <Carousel />
        <Testimonials />
      </main>
      {/* <Team />
       */}
    </>
  );
};

export default Home;
