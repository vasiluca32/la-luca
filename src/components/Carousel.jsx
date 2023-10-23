import React, { useEffect, useState } from 'react';
import './styles/Carousel.scss';
import { child, get } from 'firebase/database';
import { dbRef } from '../firebase/firebase';

const Carousel = (props) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    get(child(dbRef, 'products/'))
      .then((snapshot) => {
        const validProducts = [];
        snapshot.val().forEach((element) => {
          if (element.url) {
            validProducts.push(element);
          }
        });
        setProducts(validProducts);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <section className='carousel-component pt-5 pb-5 d-flex flex-column justify-content-center align-items-center'>
      <h2 className='mb-5'>{props.data?.title}</h2>
      <div id='carousel-1' className='carousel slide'>
        {!loading ? (
          <div className='carousel-inner'>
            {products.map((element, index) => {
              return (
                <div
                  key={element.name}
                  className={
                    index === 0 ? 'carousel-item active' : 'carousel-item'
                  }
                >
                  <img
                    src={element.url}
                    className='d-block w-100'
                    alt={element.name}
                    width='1140'
                    height='810'
                    loading='lazy'
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <p>Loading</p>
        )}

        <button
          className='carousel-control-prev'
          type='button'
          data-bs-target='#carousel-1'
          data-bs-slide='prev'
        >
          <span
            className='carousel-control-prev-icon'
            aria-hidden='true'
          ></span>
          <span className='visually-hidden'>Previous</span>
        </button>
        <button
          className='carousel-control-next'
          type='button'
          data-bs-target='#carousel-1'
          data-bs-slide='next'
        >
          <span
            className='carousel-control-next-icon'
            aria-hidden='true'
          ></span>
          <span className='visually-hidden'>Next</span>
        </button>
      </div>
    </section>
  );
};

export default Carousel;
