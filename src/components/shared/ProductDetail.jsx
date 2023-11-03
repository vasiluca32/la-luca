import { child, get } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { dbRef } from '../../firebase/firebase';

const ProductDetail = () => {
  const { productName } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    get(child(dbRef, 'test/' + '-Nhgl9Wo1kYhzFtkBDjG'))
      .then((snapshot) => {
        setProduct(snapshot.val());
      })
      .catch((error) => {
        console.error(error);
      });

    console.log(product);
  }, []);
  console.log(product);
  // if (!product) {
  //   return (
  //     <main>
  //       <div className='container'>
  //         <h1>Loading...</h1>
  //         <h2>{productName}</h2>
  //       </div>
  //     </main>
  //   ); // You can display a loading indicator while fetching data
  // } else {
  //   return (
  //     <main>
  //       <div className='container'>
  //         <h1>{product ? product : 'undefined'}</h1>
  //         <h2>{productName}</h2>
  //       </div>
  //     </main>
  //   );
  // }
};

export default ProductDetail;
