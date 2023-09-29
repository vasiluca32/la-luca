import React from 'react';
import './Home.scss';
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
        <meta property='og:title' content='Gradina La Luca' />
        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://la-luca.web.app' />
        <meta
          property='og:image'
          content='https://firebasestorage.googleapis.com/v0/b/la-luca.appspot.com/o/appAssets%2Fheading-image.jpg?alt=media&token=56d8a9bb-98c6-484c-81bb-3c270c835fa6'
        />
      </Helmet>
      <Heading />
      <Carousel />
      {/* <Team />
      <Testimonials /> */}
    </>
  );
};

export default Home;
