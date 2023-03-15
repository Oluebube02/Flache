import React, { useEffect, useState, useContext } from 'react'
import { collectionContext } from '../App'
import { useNavigate} from 'react-router-dom'
import {Props} from '../types'
import {doc, updateDoc, arrayUnion, arrayRemove} from 'firebase/firestore'
import {auth} from '../firestoreconfig'
import {flashsubset} from '../types'
import {getDoc} from 'firebase/firestore'
import CreateNewFlashset from '../DashboardComponents/CreateNewFlashset'
import DisplayComponent from '../DashboardComponents/DisplayComponent'

type ContextType = {
  flash: flashsubset[]
  setAddflash: React.Dispatch<React.SetStateAction<boolean>>
  update: (flash: flashsubset, add: boolean) => Promise<void>
  added: React.Dispatch<React.SetStateAction<boolean>>
  displaying:string
  setdisplaying: React.Dispatch<React.SetStateAction<string>>
}

export const flashContext = React.createContext({} as ContextType)

function Dashboard({isAuth}:Props){
  const [flashset, setFlashSet]  = useState<flashsubset[]>([])
  const [id, setid] = useState<string>('')
  const navigate = useNavigate()
  const [addflash, setAddflash] = useState(false)
  const [newlyadded, setnewlyadded] = useState(false)
  const collectionData= useContext(collectionContext)
  const [displaying, setDisplaying] = useState<string>('')
  
  useEffect(()=>{
    if(!isAuth){
      
      navigate('/signup')
    }else{
      const getflash = async ()=>{
        const docRef = doc(collectionData, auth.currentUser?.uid)
        const docSnap = await getDoc(docRef)
        setid(docSnap.id)
        setFlashSet(docSnap.data()?.flashcards)
        
    
    
      }
      getflash()
    }
    },
  [newlyadded, collectionData, isAuth, navigate])
  


  const updateflashcards = async (flash:flashsubset, add:boolean)=>{
    const userdoc = doc(collectionData, id)

    add?await updateDoc(userdoc, {flashcards:arrayUnion(flash)}) : await updateDoc(userdoc, {flashcards:arrayRemove(flash)})
    setnewlyadded(!newlyadded)
  }

  
 
  
  

  return (
    <div>
      <div className='dashboard'>
        <flashContext.Provider value ={{flash:flashset, setAddflash:setAddflash, update:updateflashcards, added:setnewlyadded, displaying:displaying, setdisplaying:setDisplaying}}>
          <DisplayComponent  />
          <CreateNewFlashset isopen={addflash}/>
        </flashContext.Provider>
      </div>
      <footer style = {{backgroundColor:'black', height:'50px', color:'white', bottom:'0px'}}>Made by: Oluebube Chukwubuikem</footer>
    </div>
    
    
    
  )
}

export default Dashboard
