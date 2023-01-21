import {useContext, useState} from 'react'
import {flashContext} from  '../Pages/Dashboard'
import {doc, updateDoc, arrayUnion, arrayRemove} from 'firebase/firestore'
import { collectionContext } from '../App'
import {auth} from '../firestoreconfig'
import {flashsubset, flash} from '../types'
import ReactDOM from 'react-dom'

type Props ={
  toBeRemoved : flashsubset
  setisupdate: React.Dispatch<React.SetStateAction<boolean>>
}
function UpdateFlash({toBeRemoved, setisupdate}:Props) {
  const {added, setdisplaying} = useContext(flashContext)
  const collectionData = useContext(collectionContext)
  const [QApair, setQApair] = useState<flash>({question:'', answer:''})
  const [newflashset, setflashset] = useState<flash[]>([] as flash[])
  const [add, setAdded] = useState<boolean>(false)

  const styles ={
    color:'green',
    marginTop:'0px',
    marginBottom:'0px',
    fontSize:'12px'
  }
  const style ={
    marginTop:"15px"
  }
  const closeUpdate = ()=>{
    setisupdate(false)
    setdisplaying('')
  }

  const updateflashcards = async ()=>{
    const userdoc = doc(collectionData, auth.currentUser?.uid)
    //console.log("user", userdoc.id, id)
    if (newflashset.length>0){
      const newcourse= [...toBeRemoved.course, ...newflashset]
      const replacement : flashsubset = {coursename:toBeRemoved.coursename, course:newcourse}
      await updateDoc(userdoc, {flashcards:arrayRemove(toBeRemoved)})
      await updateDoc(userdoc, {flashcards:arrayUnion(replacement)})
      added((prev)=>!prev)
    }closeUpdate()
  }
  

  const addtoflashset =()=>{
    if (QApair.answer.length===0 || QApair.question.length===0){
      alert("Please provide all inputs needed")
    }else{
      if (newflashset.length===0){
        setflashset([QApair])
      }else{
        setflashset((prev)=>([...prev, QApair]))
      }
      setQApair({question:'', answer:''})
      setAdded(true)
      setTimeout(()=>{setAdded(false)}, 1000)

    }
  }
  return ReactDOM.createPortal(
    <>
      <div className='createnewmodal'>
        <div className='question-answer'>
          <label className='question'>Question/word:</label>
          <input type='text' onChange={(event)=>{setQApair((prev)=>({...prev, question:event.target.value} as flash))}} value={QApair.question}></input>
          <div className='answerdiv'>
            <label className='answer'style={style}>Answer/Meaning:</label>
            <textarea  onChange={(event)=>{setQApair((prev)=>({...prev, answer:event.target.value} as flash))}} value={QApair.answer}></textarea>
          </div>
          {add&&<p style={styles}>Added &#x2713; </p>}
          <div className='question-button'>
            <button onClick={addtoflashset}>Add new question</button>
            <button onClick={updateflashcards}>Submit all added questions</button>
          </div>
          <p style={{fontSize:'13px', marginTop:'25px'}}>Warning: Please ensure to click "submit all added questions" when you are done.</p>
          <div className='close-button'>
            <button onClick={closeUpdate}>Close</button>
          </div>
         
        </div>
      </div>
    </>
    , document.getElementById('viewmodal') as HTMLElement
  )
}

export default UpdateFlash