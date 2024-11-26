import React from 'react';
import { Helmet } from 'react-helmet-async';

const BlogListing = () => {
  return (
    <>
      <Helmet>
        <title>Blog - Gradina La Luca</title>
        <meta property='og:title' content='Blog - Gradina La Luca' />
        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://la-luca.web.app/blog' />
        <meta
          property='og:image'
          content='https://firebasestorage.googleapis.com/v0/b/la-luca.appspot.com/o/appAssets%2Fheading-image.jpg?alt=media&token=56d8a9bb-98c6-484c-81bb-3c270c835fa6'
        />
      </Helmet>
      <main>
        <div className='container'>
          <h1>Blog page</h1>
        </div>
      </main>
    </>
  );
};

export default BlogListing;
