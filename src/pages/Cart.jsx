import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import ShoppingCart from '../components/ShoppingCart';
import { ref, onValue, get } from 'firebase/database';
import { db } from '../firebase/firebase';
import { useAuth } from '../context/AuthContext';

const Cart = () => {
  const { currentUser } = useAuth();
  const [cartToRender, setCartToRender] = useState([]);

  useEffect(() => {
    // Fetch the cart data
    const cartRef = ref(db, `users/${currentUser.uid}/shoppingCart`);
    onValue(cartRef, async (snapshot) => {
      if (snapshot.exists()) {
        const cartData = snapshot.val();

        const fetchedProducts = await Promise.all(
          Object.keys(cartData).map(async (productId) => {
            const productRef = ref(db, `products/${productId}`);
            const productSnapshot = await get(productRef);
            if (productSnapshot.exists()) {
              return {
                [productId]: {
                  ...productSnapshot.val(),
                  quantity: cartData[productId].quantity.toString(),
                },
                // Assuming cart data contains quantities
              };
            }
            return null;
          })
        );

        const productsObject = fetchedProducts.reduce((acc, product) => {
          if (product !== null) {
            return { ...acc, ...product };
          }
          return acc;
        }, {});

        setCartToRender(productsObject);
      } else {
        setCartToRender({});
      }
    });
  }, [currentUser.uid]);

  return (
    <>
      <Helmet>
        <title>Cart - Gradina La Luca</title>
      </Helmet>
      <main>
        <div className='container'>
          <ShoppingCart data={cartToRender} />
        </div>
      </main>
    </>
  );
};

export default Cart;
