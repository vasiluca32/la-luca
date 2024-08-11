import React from 'react';
import { Helmet } from 'react-helmet-async';

const Cart = () => {
  return (
    <>
      <Helmet>
        <title>Home - Gradina La Luca</title>
      </Helmet>
      <main>
        <div className='container'>
          <h1>Shopping cart</h1>
        </div>
      </main>
    </>
  );
};

export default Cart;
