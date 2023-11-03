import { child, get } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { dbRef } from '../../firebase/firebase';
import LoadingSpinner from '../common/LoadingSpinner';

const ProductDetail = () => {
  const { productID } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    get(child(dbRef, `products/${productID}`))
      .then((snapshot) => {
        setProduct(snapshot.val());
      })
      .catch((error) => {
        console.error(error);
      });
  }, [productID]);

  if (!product) {
    return (
      <main>
        <div className='container'>
          <LoadingSpinner />
        </div>
      </main>
    ); // You can display a loading indicator while fetching data
  } else {
    return (
      <main>
        <div className='container'>
          <section className='product-detail pt-5 pb-5'>
            <img src={product.url} alt={product.name} width='300' />
            <p>{product.name}</p>
            <p>{product.description}</p>
          </section>
        </div>
      </main>
    );
  }
};

export default ProductDetail;
