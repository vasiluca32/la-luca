import { Helmet } from 'react-helmet';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { storage } from '../firebase/firebase';
import { updateProfile } from 'firebase/auth';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const Profile = () => {
  const { currentUser } = useAuth();
  const [displayName, setDisplayName] = useState(
    currentUser?.displayName || ''
  );
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) return;

    setLoading(true);
    setMessage('');

    try {
      let photoURL = currentUser.photoURL;

      // Upload new photo if selected
      if (file) {
        const fileRef = ref(
          storage,
          `profilePictures/${currentUser.uid}/${file.name}`
        );
        await uploadBytes(fileRef, file);
        photoURL = await getDownloadURL(fileRef);
      }

      // Update profile
      await updateProfile(currentUser, {
        displayName,
        photoURL,
      });

      // Refresh context
      //   await refreshUser(); //GPT 20.05.2025 Update firebase display name

      setMessage('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('Failed to update profile. Try again.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Helmet>
        <title>Profil - Gradina La Luca</title>
      </Helmet>

      <main>
        <div className='container'>
          <section className='profile-component'>
            <form
              onSubmit={handleSubmit}
              id='updateProfileForm'
              name='updateProfileForm'
            >
              <h2>Informatiile din profilul tau</h2>

              <div className='mb-3'>
                <label htmlFor='userName' className='form-label'>
                  Nume de afisat
                </label>
                <input
                  type='text'
                  id='userName'
                  className='form-control'
                  name='userName'
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  required
                />
              </div>

              <div className='mb-3'>
                <label htmlFor='file' className='form-label'>
                  Selecteaza imaginea de profil
                </label>
                <input
                  type='file'
                  className='form-control'
                  name='file'
                  id='file'
                  accept='image/*'
                  onChange={handleFileChange}
                />
              </div>

              <button
                type='submit'
                className='btn btn-primary mb-3'
                disabled={loading}
              >
                {loading ? 'Updating...' : 'Update Profile'}
              </button>

              {message && <p>{message}</p>}
            </form>
          </section>
        </div>
      </main>
    </>
  );
};

export default Profile;
