import { child, get } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { dbRef } from '../firebase/firebase';

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

        <div className='page-wrapper' style={{ marginTop: '60px' }}>
          <div className='container pt-5 pb-5'>
            <div className='row row-cols-1 row-cols-md-3 g-4'>
              {products.map((element) => {
                return (
                  <div key={element.name} className='col'>
                    <div className='card h-100'>
                      <img
                        src={
                          element.url
                            ? element.url
                            : 'https://via.placeholder.com/200x150'
                        }
                        className='card-img-top'
                        alt={element.name}
                      />
                      <div className='card-body'>
                        <h5 className='card-title'>{element.name}</h5>
                        <p className='card-text'>{element.description}</p>
                        <p>Categorie: {element.category}</p>
                        <p>Tip: {element.type}</p>
                        <p>Gust: {element.taste}</p>
                        <p>Pret: {element.price} RON</p>
                        <a href='/products' className='btn btn-primary'>
                          Go somewhere
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return <p>Loading</p>;
  }
};

export default Products;
