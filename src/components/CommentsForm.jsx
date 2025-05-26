import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { addDoc, collection } from 'firebase/firestore';
import { firestoreDb } from '../firebase/firebase';

const CommentsForm = ({ blogID }) => {
  const { currentUser } = useAuth();
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(blogID);

    try {
      const blogComment = {
        userId: currentUser.uid,
        author: currentUser.displayName || currentUser.email.split('@')[0],
        comment: comment,
        avatarUrl: currentUser.photoURL || null,
        date: new Date(),
      };
      await addDoc(
        collection(firestoreDb, `blog/${blogID}/comments`),
        blogComment
      );
      console.log('Comment added');
    } catch (error) {
      console.error(error);
    }

    setComment('');
  };

  return (
    <section className='comments-form pt-5 pb-5'>
      {!currentUser ? <p>Trebuie sa fiti auentificat pentru a comenta</p> : ''}
      <form id='commentForm' name='commentForm' onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label htmlFor='commentForm' className='form-label'>
            Scrie un comentariu mai jos
          </label>
          <input
            type='text'
            id='commentForm'
            className='form-control'
            name='commentForm'
            autoComplete='off'
            disabled={!currentUser}
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            required
          />
        </div>
        <button
          type='submit'
          disabled={!currentUser}
          className='btn btn-primary'
        >
          Submit
        </button>
      </form>
    </section>
  );
};

export default CommentsForm;
