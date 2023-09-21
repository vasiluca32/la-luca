import React from 'react';
import './Home.scss';
import Heading from '../components/Heading';
import Team from '../components/Team';
import Testimonials from '../components/Testimonials';

const Home = () => {
  return (
    <>
      <Heading />
      <Team />
      <Testimonials />
    </>
  );
};

export default Home;
