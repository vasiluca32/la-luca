import React from 'react';
import './Home.scss';
import Heading from '../components/Heading';
import Team from '../components/Team';
import Testimonials from '../components/Testimonials';
import Carousel from '../components/Carousel';

const Home = () => {
  return (
    <>
      <Heading />
      <Carousel />
      <Team />
      <Testimonials />
    </>
  );
};

export default Home;
