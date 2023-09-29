import { initializeApp } from 'firebase/app';
import { child, get, getDatabase, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState();
  useEffect(() => {
    setTitle('Products - La Luca');
    const app = initializeApp(
      {
        databaseURL: 'https://la-luca-b1300.europe-west1.firebasedatabase.app/',
      },
      'app2'
    );
    const db = getDatabase(app);
    const dbRef = ref(db);

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
          <meta property='og:title' content={title} />
          <meta property='og:type' content='website' />
          <meta property='og:url' content='https://la-luca.web.app/products' />
          <meta property='og:image' content={products[0].url} />
        </Helmet>

        <div style={{ marginTop: '60px' }}>
          <h1>Products page</h1>
          <ul>
            {products.map((element) => {
              return <li key={element.name}>{element.name}</li>;
            })}
          </ul>
        </div>
      </>
    );
  } else {
    return <p>Loading</p>;
  }
};

export default Products;
