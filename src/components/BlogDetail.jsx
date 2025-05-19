import { useEffect, useState } from 'react';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { firestoreDb, storage } from '../firebase/firebase';
import { deleteDoc, doc, getDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { useAuth } from '../context/AuthContext';

const BlogDetail = () => {
  const { blogID } = useParams();
  const [blog, setBlog] = useState(null);
  const [deleted, setDeleted] = useState(false);
  const location = useLocation();
  const { currentUser } = useAuth();

  useEffect(() => {
    console.log(currentUser);
    const fetchBlog = async () => {
      try {
        const docRef = doc(firestoreDb, `blog/${blogID}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log('Document data:', docSnap.data());
          setBlog(docSnap.data());
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };

    if (blogID) fetchBlog();
  }, [blogID, currentUser]);

  async function handleDelete() {
    try {
      await deleteDoc(doc(firestoreDb, `blog/${blogID}`));
      const imgRef = ref(storage, `blogImages/${blog.imagePath}`);
      deleteObject(imgRef)
        .then(() => {
          console.log('Imge deleted');
        })
        .catch((error) => {
          console.error(error);
        });
      setDeleted(true);
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  }

  if (deleted) {
    return <Navigate to='/blog' state={{ from: location }} replace />;
  }

  return (
    <>
      <Helmet>
        <title>Blog - Blog title variable</title>
      </Helmet>
      <main>
        <div className='container'>
          <div className='buttons'>
            <button type='button' className='btn btn-primary'>
              Edit
            </button>
            <button
              type='button'
              className='btn btn-danger'
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
          <article>
            <div className='container'>
              <section className='blog-post'>
                <header>
                  <h1>{blog?.title}</h1>
                  <p className='post-meta'>
                    <span>
                      Published on{' '}
                      <time datetime={blog?.createdAt}>
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
                    </span>
                    <span>
                      {' '}
                      | By <a href='/author/john-doe'>{blog?.author}</a>
                    </span>
                    <span>
                      {' '}
                      | Category:{' '}
                      <a href='/category/web-development'>Web Development</a>
                    </span>
                  </p>
                  {/* Featured Image */}
                  <figure>
                    <img src={blog?.imageUrl} alt='Description'></img>
                    <figcaption>
                      Caption for the featured image (if necessary).
                    </figcaption>
                  </figure>
                </header>

                {/* Blog text content */}
                <div
                  className='content'
                  dangerouslySetInnerHTML={{ __html: blog?.content }}
                ></div>
                {/* <div>
                  <p style={{ color: 'red' }}>
                    Introduction to the blog post. This is where you give a
                    brief overview or hook for the reader.
                  </p>

                  <h2>Subheading 1</h2>
                  <p>
                    Content under the first subheading. This could include text,
                    images, lists, and other HTML elements.
                  </p>

                  <h2>Subheading 2</h2>
                  <p>Content under the second subheading.</p>
                  
                  <blockquote>
                    <p>
                      This is an example of a quote that you want to highlight.
                    </p>
                    <cite>— Source of the quote</cite>
                  </blockquote>
                </div> */}
              </section>
              <section id='comments'>
                <h2>Comments</h2>
                {/* <ul>
                  <li>
                    <p>
                      <strong>Jane Doe:</strong> Great post! Thanks for sharing.
                    </p>
                    <p>
                      <time datetime='2024-11-26T12:34'>
                        November 26, 2024, 12:34 PM
                      </time>
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>John Smith:</strong> This was really helpful,
                      especially the part about semantic HTML.
                    </p>
                    <p>
                      <time datetime='2024-11-26T13:45'>
                        November 26, 2024, 1:45 PM
                      </time>
                    </p>
                  </li>
                </ul> */}
              </section>
            </div>
          </article>
        </div>
      </main>
    </>
  );
};

export default BlogDetail;
