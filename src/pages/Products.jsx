import { initializeApp } from 'firebase/app';
import { child, get, getDatabase, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react';

const Products = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
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
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div style={{ marginTop: '60px' }}>
      <h1>Products page</h1>
      <ul>
        {products.map((element) => {
          return <li key={element.name}>{element.name}</li>;
        })}
      </ul>
    </div>
  );
};

export default Products;
