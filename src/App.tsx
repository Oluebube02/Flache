import { Routes, Route} from 'react-router-dom';
import React from 'react';
import './App.css';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Notfound from './Pages/Notfound';
import { useState } from 'react';
import {db } from './firestoreconfig';
import Dashboard from './Pages/Dashboard';
import Search from './Pages/Search';
import Navbar from './Pages/Navbar';
import {collection} from 'firebase/firestore'

const collectiondata = collection(db, "flashusers")

export const collectionContext = React.createContext(collectiondata)
function App() {
  const [isAuth, setIsAuth] = useState<boolean>(false)
  //const [user, setUser] = useState<string|undefined>()


  

  return (
    <div className="App">
      <collectionContext.Provider value={collectiondata}>
        <Navbar isAuth ={isAuth} setIsAuth={setIsAuth}/>
        <Routes>
          <Route path='/' element={<Home isAuth={isAuth}/>}></Route>
          <Route path='/dashboard' element={<Dashboard isAuth={isAuth} />}></Route>
          <Route path='/search' element={<Search isAuth={isAuth}/>}></Route>
          <Route path ='/signup' element = {<Login setIsAuth={setIsAuth} isAuth={isAuth}/>}></Route>
          <Route path = '*' element ={<Notfound/>}></Route>
        </Routes>
        </collectionContext.Provider>

    </div>
  );
}

export default App;
