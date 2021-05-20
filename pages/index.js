import Head from 'next/head'
import styles from '../styles/Home.module.css'
import initFirebase from '../firebase/initFirebase'
import WriteToCloudFirestore from '../components/cloudFirestore/write';
import ReadFromCloudFirestore from '../components/cloudFirestore/read';
import Counter from '../components/realtimeDatabase/counter';

initFirebase();

const Home = () => {
  return (
    <>
      <div>
        <h1>Home</h1>
      </div>
    </>
  )
}

export default Home;