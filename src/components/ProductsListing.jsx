import React, { useEffect, useState, useMemo, useCallback } from 'react';
import './styles/ProductsListing.scss';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { get, ref, set, update } from 'firebase/database';
import { db } from '../firebase/firebase';

const ProductsListing = ({ products }) => {
  const { currentUser } = useAuth();
  const [storeQuantities, setStoreQuantities] = useState({});
  const [inputQuantities, setInputQuantities] = useState({});

  const numbers = useMemo(() => Array.from({ length: 101 }, (_, i) => i), []);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        if (!currentUser) return;

        const cartRef = ref(db, `users/${currentUser.uid}/shoppingCart`);
        const snapshot = await get(cartRef);

        if (snapshot.exists()) {
          const cartData = snapshot.val();
          const initialQuantities = Object.keys(products).reduce(
            (acc, productId) => {
              acc[productId] = cartData[productId]?.quantity || 0;
              return acc;
            },
            {}
          );

          setStoreQuantities(initialQuantities);
          setInputQuantities(initialQuantities);
        }
      } catch (error) {
        console.error('Error fetching cart data: ', error);
      }
    };

    const storedScrollPosition = sessionStorage.getItem('scrollPosition');
    if (storedScrollPosition) {
      window.scrollTo(0, parseInt(storedScrollPosition));
      sessionStorage.removeItem('scrollPosition');
    }

    fetchCartData();
  }, [currentUser, products]);

  const handleClick = useCallback(() => {
    sessionStorage.setItem('scrollPosition', window.scrollY);
  }, []);

  const handleQuantityChange = useCallback((productId, value) => {
    setInputQuantities((prev) => ({
      ...prev,
      [productId]: value,
    }));
  }, []);

  const handleAddToCart = useCallback(
    async (e, productId, product) => {
      e.preventDefault();
      const quantity = inputQuantities[productId];

      if (!currentUser) {
        console.error('User is not authenticated');
        return;
      }

      const cartItemRef = ref(
        db,
        `users/${currentUser.uid}/shoppingCart/${productId}`
      );

      try {
        if (quantity === 0) {
          await set(cartItemRef, null);
          console.log(`Removed ${product.name} from cart`);
        } else {
          const snapshot = await get(cartItemRef);
          const action = snapshot.exists() ? update : set;
          await action(cartItemRef, { quantity });
          console.log(
            `${snapshot.exists() ? 'Updated' : 'Added'} ${
              product.name
            } with quantity ${quantity}`
          );
        }

        setStoreQuantities((prev) => ({
          ...prev,
          [productId]: quantity,
        }));
      } catch (error) {
        console.error('Error updating cart: ', error);
      }
    },
    [currentUser, inputQuantities]
  );

  return (
    <section className='products-listing-component pt-5 pb-5'>
      <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4'>
        {products && Object.keys(products).length > 0 ? (
          Object.keys(products).map((productId) => {
            const product = products[productId];
            const storeQuantity = storeQuantities[productId] || 0;
            const inputQuantity = inputQuantities[productId] ?? storeQuantity;

            return (
              <div key={productId} className='col'>
                <div className='card h-100'>
                  <img
                    src={product.url || 'https://via.placeholder.com/200x150'}
                    className='card-img-top'
                    alt={product.name}
                  />
                  <div className='card-body'>
                    <Link to={`/products/${productId}`} onClick={handleClick}>
                      Detalii
                    </Link>
                    <h5 className='card-title'>{product.name}</h5>
                    <p className='card-text'>{product.description}</p>
                    <p>
                      <b>Categorie:</b> {product.category}
                    </p>
                    <p>
                      <b>Tip:</b> {product.type}
                    </p>
                    <p>
                      <b>Gust:</b> {product.taste}
                    </p>
                    <p>
                      <b>Pret:</b> {product.price} RON/{product.um}
                    </p>
                    <form
                      className='position-relative pb-5'
                      onSubmit={(e) => handleAddToCart(e, productId, product)}
                    >
                      <label
                        htmlFor={`quantity-${productId}`}
                        className='form-label'
                      >
                        <b>Selecteaza cantitatea: </b>
                        <select
                          name='quantity'
                          id={`quantity-${productId}`}
                          value={inputQuantity}
                          onChange={(e) =>
                            handleQuantityChange(productId, +e.target.value)
                          }
                        >
                          {numbers.map((number) => (
                            <option key={number} value={number}>
                              {number}
                            </option>
                          ))}
                        </select>
                        <span> </span>
                        {product.um}
                      </label>
                      {currentUser ? (
                        <button
                          type='submit'
                          className='btn btn-primary position-absolute'
                          disabled={
                            (storeQuantity === 0 && inputQuantity === 0) ||
                            storeQuantity === inputQuantity
                          }
                        >
                          Adauga in cos
                        </button>
                      ) : (
                        <>
                          <p>
                            Creaza-ti cont sau autentifica-te ca sa adaugi
                            elemente in cos
                          </p>
                          <button
                            type='submit'
                            className='btn btn-primary position-absolute'
                            disabled
                          >
                            Adauga in cos
                          </button>
                        </>
                      )}
                    </form>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p>Momentan nu exista produse disponibile</p>
        )}
      </div>
    </section>
  );
};

export default ProductsListing;
