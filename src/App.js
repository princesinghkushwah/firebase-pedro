import './App.css';
import Auth from './component/Auth';
import { db ,auth} from "./config/firebase"
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';


function App() {
  const [movie, setMovie] = useState([])
  const moviesCollectionRef = collection(db, "movies");


  const [newMovieTitle, setNewMovieTitle] = useState("")
  const [newMovieRelease, setNewMovieRelease] = useState("")
  const [isHit, setIsHit] = useState(false)

  const [updateTitle, setUpdateTitle] = useState("")

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



  useEffect(() => {
    getMoviesList()
  }, [])


  const onSubmitMovie = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        title: newMovieTitle,
        releaseDate: newMovieRelease,
        hit: isHit,
        userId : auth?.currentUser?.uid
      })
      getMoviesList()

    } catch (error) {
      console.log(error);
    }
  }

  const deleteMovie = async (id) => {
    try {
      const movieDoc = doc(db, "movies", id)
      await deleteDoc(movieDoc)
    } catch (error) {
      console.log(error);
    }
  }

  const updateMovieTitle = async (id) => {
    try {
      const movieDoc = doc(db, "movies", id)
      await updateDoc(movieDoc, { title: updateTitle })
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
        <input type='checkbox' checked={isHit} id='hit' onChange={(e) => setIsHit(e.target.checked)} />
        <label htmlFor='hit'>Hit</label>
        <button onClick={onSubmitMovie}>submit</button>
      </div>

      <div>{movie?.map((movie, ind) => (
        <div key={ind}>
          <p >{movie?.title}</p>  <button onClick={() => deleteMovie(movie?.id)}>Delete</button>
          <input type='text' onChange={(e) => setUpdateTitle(e.target.value)} /><button onClick={()=>updateMovieTitle(movie?.id)}>update Movie Title</button><br />
        </div>
      ))}</div>
    </div>
  );
}

export default App;
