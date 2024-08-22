import React, { useCallback, useEffect, useState } from 'react';
import { db, functions } from '../firebase/firebase';
import { useAuth } from '../context/AuthContext';
import { get, ref, set, update } from 'firebase/database';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { httpsCallable } from 'firebase/functions';

const ShoppingCart = ({ data }) => {
  const { currentUser } = useAuth();
  const [storeQuantities, setStoreQuantities] = useState({});
  const [inputQuantities, setInputQuantities] = useState({});
  const [phoneNumber, setPhoneNumber] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const totalAmount = Object.keys(data).reduce((total, productId) => {
    const product = data[productId];
    return total + product.price * product.quantity;
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

  const handleOrder = () => {
    console.log(phoneNumber);
    setSubmitted(true);
    if (!phoneNumber) {
      return;
    }

    if (
      phoneNumber.length === 0 ||
      phoneNumber.length < 11 ||
      phoneNumber.length > 12
    ) {
      return;
    }

    const date = new Date();
    const orderNr = `${date.getFullYear()}${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}${date
      .getHours()
      .toString()
      .padStart(2, '0')}${date.getMinutes().toString().padStart(2, '0')}${date
      .getSeconds()
      .toString()
      .padStart(2, '0')}`;
    setOrderNumber(orderNr);

    // firebase function call
    const email = currentUser.email;
    const products = data;

    const sendOrderEmail = httpsCallable(functions, 'sendOrderEmail');
    sendOrderEmail({ products, totalAmount, orderNr, email, phoneNumber })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });

    setOrderPlaced(true);
    setPhoneNumber('');
    setSubmitted(false);
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
      <div className='card bg-warning p-1'>
        <div className='row'>
          <div className='col text-center'>
            <h4>Total cos cumparaturi: {totalAmount} RON</h4>
            <button
              type='button'
              className='btn btn-primary'
              data-bs-toggle='modal'
              data-bs-target='#exampleModal'
            >
              Plaseaza comanda
            </button>
          </div>
        </div>
      </div>

      <div
        className='modal fade'
        id='exampleModal'
        tabIndex='-1'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-dialog-centered'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h1 className='modal-title fs-5' id='exampleModalLabel'>
                {!orderPlaced ? 'Telefon de contact' : 'Comanda inregistrata'}
              </h1>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body'>
              {!orderPlaced ? (
                <>
                  <p>
                    Va rugam furnizati un numar de telefon pentru a va putea
                    contacta atunci cand vom livra comanda
                  </p>
                  <PhoneInput
                    international
                    defaultCountry='RO'
                    value={phoneNumber}
                    onChange={(value) => {
                      setPhoneNumber(value);
                      setSubmitted(false);
                    }}
                    countryCallingCodeEditable={false}
                  />

                  {submitted && !phoneNumber ? (
                    <>
                      <br></br>
                      <p>Numarul de telefon este obligatoriu</p>
                    </>
                  ) : submitted &&
                    (phoneNumber?.length < 11 || phoneNumber?.length > 12) ? (
                    <>
                      <br></br>
                      <p>Numarul de telefon nu este valid</p>
                    </>
                  ) : (
                    ''
                  )}
                </>
              ) : (
                <p>
                  Comanda inregistrata cu numarul {orderNumber}. Veti primi in
                  email cu sumarul comenzii. Puteti inchide aceasta fereastra
                </p>
              )}
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                data-bs-dismiss='modal'
                onClick={() => {
                  setOrderPlaced(false);
                  setSubmitted(false);
                }}
              >
                Inchideti
              </button>
              <button
                type='button'
                className='btn btn-primary'
                onClick={handleOrder}
                disabled={orderPlaced}
              >
                Salvati
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShoppingCart;
