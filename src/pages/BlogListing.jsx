import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { firestoreDb } from '../firebase/firebase';
import { Link } from 'react-router-dom';
import '../components/styles/BlogListing.scss';
const BlogListing = () => {
  const [blogData, setBlogData] = useState([]);

  useEffect(() => {
    async function getBlog() {
      try {
        const blogQuery = query(
          collection(firestoreDb, 'blog'),
          orderBy('createdAt', 'desc') // Sort by createdAt descending
        );
        const querySnapshot = await getDocs(blogQuery);
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
          <section className='blog-listing-component pt-5 pb-5'>
            <h1 className='mb-5'>Citeste un blog din lista de mai jos</h1>
            <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4'>
              {blogData.map((blog) => (
                <div key={blog.id} className='col'>
                  <div className='card h-100'>
                    <Link
                      to={`/blog/${blog.id}`}
                      className='text-decoration-none text-body'
                    >
                      <img
                        src={blog.imageUrl}
                        className='card-img-top'
                        alt='Blog Ilustration'
                      />
                      <div className='card-body'>
                        <h2>{blog.title}</h2>
                        <p>{blog.description}</p>
                        <p>Autor: {blog.author}</p>
                        <p>
                          <time dateTime={blog.createdAt}>
                            {blog?.createdAt.toDate().toLocaleString('ro-RO', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                            ;
                          </time>
                        </p>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default BlogListing;
