import React from 'react';
import './styles/ProductsListing.scss';
import { Link } from 'react-router-dom';

const ProductsListing = ({ products }) => {
  return (
    <section className='products-listing-component pt-5 pb-5'>
      <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4'>
        {Object.keys(products).map((productId) => {
          const element = products[productId];
          return (
            <div key={productId} className='col'>
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
                <div className='card-body position-relative pb-5'>
                  <Link to={`/products/${productId}`}>Detalii</Link>
                  <h5 className='card-title'>{element.name}</h5>
                  <p className='card-text'>{element.description}</p>
                  <p>
                    <b>Categorie:</b> {element.category}
                  </p>
                  <p>
                    <b>Tip:</b> {element.type}
                  </p>
                  <p>
                    <b>Gust:</b> {element.taste}
                  </p>

                  <p>
                    <b>Pret:</b> {element.price} RON/{element.um}
                  </p>

                  <a
                    href='/products'
                    className='btn btn-primary position-absolute'
                  >
                    Adauga in cos
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ProductsListing;
