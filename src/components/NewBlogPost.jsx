import React, { useState, useRef } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { firestoreDb, storage } from '../firebase/firebase';
import {
  uploadBytes,
  ref as ref_storage,
  getDownloadURL,
} from 'firebase/storage';

const NewBlogPost = () => {
  const [content, setContent] = useState('');
  const [blogTitle, setBlogTitle] = useState('');
  const [imageCaption, setImageCaption] = useState('');
  const [blogDescription, setBlogDescription] = useState('');

  const fileInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const file = fileInputRef.current.files[0];
    if (!file) {
      alert('Please upload an image');
      return;
    }

    const imageStorageRef = ref_storage(storage, `blogImages/${file.name}`);
    try {
      await uploadBytes(imageStorageRef, file);
      console.log('Uploaded a blob or file!');

      const url = await getDownloadURL(imageStorageRef);

      await addDoc(collection(firestoreDb, 'blog'), {
        title: blogTitle,
        description: blogDescription,
        imageUrl: url,
        imagePath: file.name,
        caption: imageCaption,
        content: content,
        createdAt: new Date(),
        author: 'To update author',
      });

      console.log('Document successfully written!');
    } catch (error) {
      console.error('Error adding document: ', error);
    }

    setContent('');
    setBlogTitle('');
    setImageCaption('');
    setBlogDescription('');
    fileInputRef.current.value = '';
  };

  return (
    <section className='pt-5 pb-5'>
      <h1>Posteaza mai jos un blog nou.</h1>
      <form id='blogForm' name='blogForm' onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label htmlFor='blogTitle' className='form-label'>
            Titlu blog
          </label>
          <input
            type='text'
            id='blogTitle'
            className='form-control'
            name='blogTitle'
            autoComplete='on'
            onChange={(e) => setBlogTitle(e.target.value)}
            value={blogTitle}
            required
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='blogDescription' className='form-label'>
            Descriere blog
          </label>
          <input
            type='text'
            id='blogDescription'
            className='form-control'
            name='blogDescription'
            autoComplete='off'
            onChange={(e) => setBlogDescription(e.target.value)}
            value={blogDescription}
            required
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='file' className='form-label'>
            Imagine blog
          </label>
          <input
            type='file'
            className='form-control'
            name='file'
            autoComplete='on'
            id='file'
            ref={fileInputRef}
            required
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='imageCaption' className='form-label'>
            Titlu blog
          </label>
          <input
            type='text'
            id='imageCaption'
            className='form-control'
            name='imageCaption'
            autoComplete='on'
            onChange={(e) => setImageCaption(e.target.value)}
            value={imageCaption}
            required
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='content' className='form-label'>
            Content blog
          </label>
          <textarea
            className='form-control'
            rows={15}
            onChange={(e) => setContent(e.target.value)}
            value={content}
            name='content'
            id='content'
            required
          />
        </div>

        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </form>
    </section>
  );
};

export default NewBlogPost;
