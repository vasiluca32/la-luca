import { push, ref, set } from 'firebase/database';
import React from 'react';
import { db, storage } from '../firebase/firebase';
import {
  uploadBytes,
  ref as ref_storage,
  getDownloadURL,
} from 'firebase/storage';

const ProductForm = () => {
  async function handleformSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const category = formData.get('category');
    const description = formData.get('description');
    const name = formData.get('name');
    const price = formData.get('price');
    const taste = formData.get('taste');
    const type = formData.get('type');
    const um = formData.get('um');
    const file = formData.get('file');

    const productsDb = ref(db, 'products');
    const newProduct = push(productsDb);
    const imageStorageRef = ref_storage(storage, `productImages/${file.name}`);

    await uploadBytes(imageStorageRef, file)
      .then((snapshot) => {
        console.log('Uploaded a blob or file!');
        getDownloadURL(imageStorageRef, `productImages/${file.name}`)
          .then((url) => {
            set(newProduct, {
              category,
              description,
              name,
              price,
              taste,
              type,
              um,
              url,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
    e.target.reset();
  }
  return (
    <>
      <h5>Completeaza formularul pentru a adauga un nou produs</h5>
      <form onSubmit={handleformSubmit}>
        <div className='mb-3'>
          <label htmlFor='category' className='form-label'>
            Categorie
          </label>
          <input
            type='text'
            className='form-control'
            name='category'
            autoComplete='on'
            id='category'
            required
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='description' className='form-label'>
            Descriere
          </label>
          <textarea
            type='text'
            id='description'
            className='form-control'
            name='description'
            autoComplete='on'
            required
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='name' className='form-label'>
            Nume
          </label>
          <input
            type='text'
            id='name'
            className='form-control'
            name='name'
            autoComplete='on'
            required
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='price' className='form-label'>
            Pret
          </label>
          <input
            type='number'
            id='price'
            name='price'
            required
            className='form-control'
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='taste' className='form-label'>
            Gust
          </label>
          <input
            type='text'
            className='form-control'
            name='taste'
            autoComplete='on'
            id='taste'
            required
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='type' className='form-label'>
            Tip
          </label>
          <input
            type='text'
            className='form-control'
            name='type'
            autoComplete='on'
            id='type'
            required
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='um' className='form-label'>
            Um
          </label>
          <input
            type='text'
            className='form-control'
            name='um'
            autoComplete='on'
            id='um'
            required
          />
        </div>
        <div className='mb-3'>
          <label className='form-label'>Imagine pentru produs</label>
          <input
            type='file'
            className='form-control'
            name='file'
            autoComplete='on'
            required
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </form>
    </>
  );
};

export default ProductForm;
