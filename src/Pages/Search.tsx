import React, {useContext, useEffect, useState}from 'react'
import {auth} from '../firestoreconfig'
import { collectionContext } from '../App'
import { query, where, doc, getDoc, getDocs, updateDoc, arrayUnion} from "firebase/firestore";
import {flashsubset} from '../types'
import FlashSetDisplay from '../DashboardComponents/FlashSetDisplay'

type Props={
  isAuth:boolean
}

function Search({isAuth}:Props) {
  const collectiondata = useContext(collectionContext)
  const [otherflash, setOtherFlash] = useState<flashsubset[]>([])
  const [displaying, setDisplaying] = useState<string>('')
  const [school, setSchool] = useState<string>('')
  useEffect(()=>{
    const getData = async() =>{
      const docRef = doc(collectiondata, auth.currentUser?.uid)
      const docSnap = await getDoc(docRef)
      const school :string= docSnap.data()?.school
      setSchool(school)
      const q= query(collectiondata, where('id', '!=', auth.currentUser?.uid), where('public', '==', true), where('school', '==', school))
      console.log("q", q)
      const querySnapshot = (await getDocs(q)).docs
      console.log("query", querySnapshot)
      const flasharray:flashsubset[][] = querySnapshot.map((snap)=>snap.data().flashcards)
      console.log("flasharray",flasharray)
      const flatFlatten = (array:flashsubset[][]):flashsubset[]=> {
        return array.flat(Infinity) as flashsubset[]; 
      }
      const flasharrayspread : flashsubset[] = flatFlatten(flasharray)
    
      console.log("spread", flasharrayspread)
      setOtherFlash(flasharrayspread)
    }
    isAuth&& getData()
  }, [isAuth, collectiondata])
  console.log("otherflash", otherflash)
  const updateflashcards = async (flash:flashsubset)=>{
    const userdoc = doc(collectiondata, auth.currentUser?.uid)
    await updateDoc(userdoc, {flashcards:arrayUnion(flash)})
    
  }
  const getDataDisplay = otherflash.map((flash)=><FlashSetDisplay subset={flash} Key={flash.coursename} displaying={displaying} addfromsearch={updateflashcards} setIsDisplaying={setDisplaying} mine={false}/>)
  return (
    <div className='searchPage'>
      <div style ={{width:'100vw'}}><h2>Filtered by School : {school.toLocaleUpperCase()}</h2></div>
      <div className='getdisplay'>{getDataDisplay.length===0?"NOTHING FOUND":[...getDataDisplay]}</div>
    </div>
  )

}

export default Search