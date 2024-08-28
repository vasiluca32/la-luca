import { child, get } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { dbRef } from '../../firebase/firebase';
import LoadingSpinner from '../common/LoadingSpinner';
import '../styles/ProductDetail.scss';

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
            <img
              className='mb-2'
              src={product.url}
              alt={product.name}
              width='500'
            />
            <p>
              {product.type} {product.name}
            </p>
            <p>{product.description}</p>
          </section>
        </div>
      </main>
    );
  }
};

export default ProductDetail;
