import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { productName } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    setProduct(productName);
  }, [productName]);
  console.log(productName);
  if (!product) {
    return (
      <main>
        <div className='container'>
          <h1>Loading...</h1>
          <h2>{productName}</h2>
        </div>
      </main>
    ); // You can display a loading indicator while fetching data
  } else {
    return (
      <main>
        <div className='container'>
          <h1>{product ? product : 'undefined'}</h1>
          <h2>{productName}</h2>
        </div>
      </main>
    );
  }
};

export default ProductDetail;
