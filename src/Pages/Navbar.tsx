import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import{useNavigate} from 'react-router-dom'
import {auth, provider} from '../firestoreconfig'
import {signOut, signInWithPopup, onAuthStateChanged} from 'firebase/auth'
import {doc, getDoc} from 'firebase/firestore'
import { collectionContext } from '../App'
type Propauth ={
  isAuth:boolean
  setIsAuth:React.Dispatch<React.SetStateAction<boolean>>
}

function Navbar({isAuth, setIsAuth}:Propauth) {
  const navigate = useNavigate()
  const signUserout = () =>{
    signOut(auth).then(()=>{
      setIsAuth(false)
      navigate('/')
    })
  }
  const collectiondata = useContext(collectionContext)
  const signInWithGoogle = () =>{
    signInWithPopup(auth, provider).then(() =>{
      onAuthStateChanged(auth,(currentUser)=>{
        const checkfirst =  async()=>{
          if(currentUser){
            const docRef = doc(collectiondata, auth.currentUser?.uid)
            const docSnap = await getDoc(docRef)
            if (docSnap.exists()){
              setIsAuth(true)
              navigate('/dashboard')
            }else{
              
              navigate('/signup')
            }
          }
        }
        checkfirst()
      })
      
    })
  }
  return (
    <nav className='appNav'>
      <div className='linksDiv'>
        <Link to='/'>Home</Link>
        <Link to='/dashboard'>Dashboard</Link>
        <Link to='/search'>Find Other Flashcards</Link> 
      </div>
      <div className='logoutBtnDiv'>
        <Link to='/'><button onClick={()=>{isAuth?signUserout():signInWithGoogle()}}>{isAuth?"Logout":"Login"}</button></Link> 
      </div>

    </nav>
    
  )
}

export default Navbar