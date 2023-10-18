import { child, get } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { dbRef } from '../firebase/firebase';
import ProductsListing from '../components/ProductsListing';

// needs refactoring to move rendering to a sub-component
const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    get(child(dbRef, 'products/'))
      .then((snapshot) => {
        setProducts(snapshot.val());
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (!loading) {
    return (
      <>
        <Helmet>
          <title>Products - Gradina La Luca</title>
        </Helmet>

        <main>
          <div className='container'>
            <ProductsListing products={products} />
          </div>
        </main>
      </>
    );
  } else {
    return <p>Loading</p>;
  }
};

export default Products;
