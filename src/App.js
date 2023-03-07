import './App.css';
import Auth from './component/Auth';
import { db } from "./config/firebase"
import { getDocs, collection, addDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { async } from '@firebase/util';


function App() {
  const [movie, setMovie] = useState([])
  const moviesCollectionRef = collection(db, "movies");


  const [newMovieTitle, setNewMovieTitle] = useState("")
  const [newMovieRelease, setNewMovieRelease] = useState("")
  const [isHit, setIsHit] = useState(false)

  useEffect(() => {
    const getMoviesList = async () => {
      try {
        const data = await getDocs(moviesCollectionRef)
        const filterData = data?.docs?.map((doc) => ({ ...doc.data(), id: doc.id }))
        console.log(filterData);
        setMovie(filterData)
      } catch (error) {
        console.log(error);
      }
    }

    getMoviesList()

  }, [])



  const onSubmitMovie = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        title: newMovieTitle,
        releaseDate: newMovieRelease,
        hit: isHit
      })
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="App">
      <Auth />

      <div>
        <input placeholder='title' value={newMovieTitle} onChange={(e) => setNewMovieTitle(e.target.value)} />
        <input placeholder='release date' type='number' value={newMovieRelease} onChange={(e) => setNewMovieRelease(Number(e.target.value))} />
        <input type='checkbox' checked={isHit} onChange={(e) => setIsHit(e.target.checked)} />
        <label>Hit</label>
        <button onClick={onSubmitMovie}>submit</button>
      </div>

      <div>{movie?.map(movie => movie?.title)}</div>
    </div>
  );
}

export default App;
