import { useEffect, useState } from 'react';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { firestoreDb, storage } from '../firebase/firebase';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { useAuth } from '../context/AuthContext';
import CommentsForm from './CommentsForm';

const BlogDetail = () => {
  const { blogID } = useParams();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState(null);
  const [deleted, setDeleted] = useState(false);
  const location = useLocation();
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const docRef = doc(firestoreDb, `blog/${blogID}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setBlog(docSnap.data());
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };

    if (blogID) fetchBlog();

    const q = query(
      collection(firestoreDb, `blog/${blogID}/comments`),
      orderBy('date', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedComments = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComments(fetchedComments);
    });

    return () => unsubscribe();
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
            <button type='button' className='btn btn-primary' disabled>
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
                      <time dateTime={blog?.createdAt}>
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
                      | By{' '}
                      <a href='/author/john-doe'>
                        <img
                          src={blog?.authorImg}
                          width='300'
                          alt='Author'
                        ></img>
                        {blog?.author}
                      </a>
                    </span>
                    {/* <span>
                      {' '}
                      | Category:{' '}
                      <a href='/category/web-development'>Web Development</a>
                    </span> */}
                  </p>
                  {/* Featured Image */}
                  <figure>
                    <img src={blog?.imageUrl} alt='Description'></img>
                    <figcaption>{blog?.caption}</figcaption>
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
                <ul>
                  {comments?.map((comment) => (
                    <li key={comment.id}>
                      <p>
                        <img
                          src={comment.avatarUrl}
                          alt='Author'
                          width='50'
                        ></img>
                        <strong>{comment.author}:</strong> {comment.comment}
                      </p>
                      <p>
                        <time dateTime={comment?.date}>
                          {comment?.date.toDate().toLocaleString('ro-RO', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </time>
                      </p>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </article>
          <CommentsForm blogID={blogID} />
        </div>
      </main>
    </>
  );
};

export default BlogDetail;
