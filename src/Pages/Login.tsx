import  React, { Dispatch, useContext, useState} from 'react'
import { auth, provider } from '../firestoreconfig'
import {onAuthStateChanged, signInWithPopup} from 'firebase/auth'
import {useNavigate} from 'react-router-dom'
import {getDoc, setDoc, doc} from 'firebase/firestore'
import {FlashUser} from '../types'
import { collectionContext } from '../App'




type Props ={
  setIsAuth : Dispatch<React.SetStateAction<boolean>>
  isAuth:boolean
}
function Login({setIsAuth, isAuth}:Props) {

  const [isPublic, setIsPublic] = useState(false)
  const [college, setCollege] = useState('')
  let navigate = useNavigate()


  const collectiondata = useContext(collectionContext)
  const signInWithGoogle = () =>{
    signInWithPopup(auth, provider).then(() =>{
      //localStorage.setItem("isAuth", String(true))
      setIsAuth(true)
    }
    )
  }



  const signup = () =>{
    if (college.length<10){
      alert("Please input a valid school name")
    }else{
      signInWithGoogle()
      onAuthStateChanged(auth, (currentUser)=>{
        console.log("onauth")
        const school = college.toLocaleLowerCase()
        const user :FlashUser ={public:isPublic, school:school, id:currentUser?.uid, flashcards:[]}
        const checkfirst = async() =>{
          const docRef = doc(collectiondata, auth.currentUser?.uid)
          const docSnap = await getDoc(docRef)
          console.log("exists", docSnap.exists())
          if (!docSnap.exists()){
            setDoc(doc(collectiondata, auth.currentUser?.uid), user)
            navigate('/dashboard')
          }else{
            navigate('/dashboard')
          }
        } 
        checkfirst()
      })

    }
  }
  return (
    <div className='loginPage'>
      <h2>Please fill out these information</h2>
      <label className='collegeName'>
        College/University name:
        <input type='text' onChange={(event)=>setCollege(event.target.value)}></input>
      </label>
      <label className="container">Make my flashcards available to other users
        <input type="checkbox" onClick={()=>setIsPublic((isPublic)=>!isPublic)}></input>
      </label>
      <p>Sign In With google to Continue </p>
      <button className='login-with-google-btn' onClick={signup}>Sign in with Google</button>
    </div>
  )
}

export default Login