import React, { useCallback, useEffect, useState } from 'react';
import { db } from '../firebase/firebase';
import { useAuth } from '../context/AuthContext';
import { get, ref, set, update } from 'firebase/database';

const ShoppingCart = ({ data }) => {
  const { currentUser } = useAuth();
  const [storeQuantities, setStoreQuantities] = useState({});
  const [inputQuantities, setInputQuantities] = useState({});

  const totalAmount = Object.keys(data).reduce((total, productId) => {
    const product = data[productId];
    return total + product.price * product.quantity.quantity;
  }, 0);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        if (!currentUser) return;

        const cartRef = ref(db, `users/${currentUser.uid}/shoppingCart`);
        const snapshot = await get(cartRef);

        if (snapshot.exists()) {
          const cartData = snapshot.val();
          const initialQuantities = Object.keys(data).reduce(
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
    fetchCartData();
  }, [currentUser, data]);

  const handleSubmit = useCallback(
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

  const handleChange = useCallback((productId, value) => {
    setInputQuantities((prev) => ({
      ...prev,
      [productId]: value,
    }));
  }, []);

  const handleDelete = (productId, product) => {
    const cartItemRef = ref(
      db,
      `users/${currentUser.uid}/shoppingCart/${productId}`
    );
    set(cartItemRef, null);
    console.log(`Removed ${product.name} from cart`);
  };

  return (
    <section className='shoppingCart-component pt-5 pb-5'>
      <h2>Shopping cart component</h2>
      {Object.keys(data).map((productId) => {
        const product = data[productId];
        const storeQuantity = storeQuantities[productId] || 0;
        const inputQuantity = inputQuantities[productId] ?? storeQuantity;
        return (
          <div className='card mb-3' key={productId}>
            <div className='row g-0 align-items-center text-center text-md-start'>
              <div className='col-md-3'>
                <img
                  className='img-fluid rounded-start'
                  src={product.url || 'https://via.placeholder.com/200x150'}
                  alt={product.name}
                ></img>
              </div>
              <div className='col-md-3'>
                <div className='card-body'>
                  <p>{product.name}</p>
                </div>
              </div>
              <div className='col-md-4'>
                <div className='card-body'>
                  <form onSubmit={(e) => handleSubmit(e, productId, product)}>
                    <p>
                      Ati ales{' '}
                      <input
                        style={{ width: '3rem' }}
                        type='number'
                        name='selectedQuantity'
                        id='selectedQuantity'
                        onChange={(e) =>
                          handleChange(productId, +e.target.value)
                        }
                        value={inputQuantity}
                      />{' '}
                      {product.um} X {product.price} RON{' '}
                    </p>
                    <button
                      type='submit'
                      className='btn btn-primary mx-1 my-1'
                      disabled={
                        (storeQuantity === 0 && inputQuantity === 0) ||
                        storeQuantity === inputQuantity
                      }
                    >
                      Actualizeaza cantitatea
                    </button>

                    <button
                      type='button'
                      className='btn btn-danger mx-1 my-1'
                      disabled={storeQuantity === 0 && inputQuantity === 0}
                      onClick={() => handleDelete(productId, product)}
                    >
                      Sterge
                    </button>
                  </form>
                </div>
              </div>
              <div className='col-md-2'>
                <div className='card-body'>
                  <h4>Total</h4>
                  <p>{product.quantity.quantity * product.price} RON</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <div className='card bg-warning'>
        <div className='row'>
          <div className='col text-end'>
            <h4>Total cos cumparaturi: {totalAmount} RON</h4>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShoppingCart;
