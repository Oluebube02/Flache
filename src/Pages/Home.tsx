import React, {useEffect, useState}from 'react'
import {db} from '../firestoreconfig'
import {collection, getDocs} from 'firebase/firestore'
import { Link } from 'react-router-dom'
import SubHome from './SubHome'
import folder from '../images/folder.png'
import publicicon from '../images/public-relation.png'
import changes from '../images/changes.png'
import {Props} from '../types'

function Home({isAuth}:Props) {
  
  return(
    <div className='homePage'>
      <div className='intro'>
        <h1>Flache</h1>
        <h3>Make studying easier...</h3>
      </div>
      <div className='infoDiv'>
        <SubHome source={folder} title={'Organize'} info={'Group your flashcards according to course or subject name'}/>
        <SubHome source={publicicon} title={'Visibility'} info={'Make your flashcards visible to other users'}/>
        <SubHome source={changes} title={'Update'} info={'Update or delete your flashcards whenever you want'}/>
      </div>
      {!isAuth && 
        <div className='getStarted'>
        <h2>Ready to Begin?</h2>
        <Link to='/signup'> <button>Sign Up with Google</button></Link>
      </div>
      }
      
      <footer>Made by: Oluebube Chukwubuikem</footer>
    </div>
  ) 
    

  
}

export default Home