import React, { useEffect, useState } from 'react';
import Heading from '../components/Heading';
// import Team from '../components/Team';
import Testimonials from '../components/Testimonials';
import Carousel from '../components/Carousel';
import { Helmet } from 'react-helmet-async';
import { doc, getDoc } from 'firebase/firestore';
import { firestoreDb } from '../firebase/firebase';

const Home = () => {
  const [firestoreData, setFirestoreData] = useState('');

  useEffect(() => {
    async function getData() {
      try {
        const docRef = doc(firestoreDb, 'pages', 'home');
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setFirestoreData(docSnap.data());
        } else {
          // docSnap.data() will be undefined in this case
          console.error('Error loading data');
        }
      } catch (error) {
        console.log(error);
      }
    }

    getData();
  }, []);

  return (
    <>
      <Helmet>
        <title>Home - Gradina La Luca</title>
      </Helmet>

      <main>
        <div className='container'>
          <Heading data={firestoreData.heading} />
          <Carousel data={firestoreData.carousel} />
          <Testimonials />
        </div>
      </main>
      {/* <Team />
       */}
    </>
  );
};

export default Home;
