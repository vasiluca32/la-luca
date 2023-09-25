import React from 'react';
import './Home.scss';
import Heading from '../components/Heading';
import Team from '../components/Team';
import Testimonials from '../components/Testimonials';

const Home = () => {
  return (
    <>
      {/* some data for pr test */}
      <Heading />
      <Team />
      <Testimonials />
    </>
  );
};

export default Home;
