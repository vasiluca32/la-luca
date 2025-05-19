import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
// import Blog from '../components/Blog';
import { collection, getDocs } from 'firebase/firestore';
import { firestoreDb } from '../firebase/firebase';
import { Link } from 'react-router-dom';

const BlogListing = () => {
  const [blogData, setBlogData] = useState([]);

  useEffect(() => {
    async function getBlog() {
      try {
        const querySnapshot = await getDocs(collection(firestoreDb, 'blog'));
        const blogs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setBlogData(blogs); // ← now saving them into state
      } catch (error) {
        console.error('Error fetching blog data:', error);
      }
    }

    getBlog();
  }, []);
  return (
    <>
      <Helmet>
        <title>Blog - Gradina La Luca</title>
        <meta property='og:title' content='Blog - Gradina La Luca' />
        <meta property='og:type' content='website' />
        <meta property='og:url' content='https://la-luca.web.app/blog' />
        <meta
          property='og:image'
          content='https://firebasestorage.googleapis.com/v0/b/la-luca.appspot.com/o/appAssets%2Fheading-image.jpg?alt=media&token=56d8a9bb-98c6-484c-81bb-3c270c835fa6'
        />
      </Helmet>
      <main>
        <div className='container'>
          <h1>Citeste un blog din lista de mai jos</h1>
          {blogData.map((blog) => (
            <div
              key={blog.id}
              style={{ marginBottom: '1rem', border: '1px solid red' }}
            >
              <Link to={`/blog/${blog.id}`}>
                <h2>{blog.title}</h2>
                <img src={blog.imageUrl} alt='Blog Ilustration' />
              </Link>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default BlogListing;
