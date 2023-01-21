import React, {useState, useContext} from 'react'
import ReactDOM from 'react-dom'
import {flashsubset, flash} from '../types'
import {flashContext} from  '../Pages/Dashboard'


type createnewprops ={
  isopen:boolean

}
function CreateNewFlashset({isopen}:createnewprops) {
  const [flashsetname, setflashsetname] = useState<string>('')
  const [nameprovided, setnameprovided] = useState<boolean>(false)
  const [QApair, setQApair] = useState<flash>({question:'', answer:''})
  const [newflashset, setflashset] = useState<flashsubset>({coursename:'', course:[]} as flashsubset)
  const [added, setAdded] = useState<boolean>(false)

  const {setAddflash, update, setdisplaying} = useContext(flashContext)
  const styles ={
    color:'green',
    marginTop:'0px',
    marginBottom:'0px',
    fontSize:'12px'
  }
  const togglenameprovided =()=>{
    if (flashsetname.length<=4){
      alert("Flashset name must be more than four letters")
    }else{
      setnameprovided(true)
      setflashset((prev)=>({...prev, coursename:flashsetname}))
    }
  }

  const addtoflashset =()=>{
    if (QApair.answer.length===0 || QApair.question.length===0){
      alert("Please provide all inputs needed")
    }else{
      if (newflashset.course.length===0){
        setflashset((prev)=>({...prev,course:[QApair]} as flashsubset))
      }else{
        setflashset((prev)=>({...prev,course:[...prev.course, QApair]} as flashsubset))
      }
      setQApair({question:'', answer:''})
      setAdded(true)
      setTimeout(()=>{setAdded(false)}, 1000)

    }
  }
  //console.log(newflashset)
  console.log("rendering")
  const style ={
    marginTop:"15px"
  }
  const submitflashset = ()=>{
    setnameprovided(false)
    setAddflash(false)
    setflashset({coursename:'', course:[]})
    update(newflashset, true)
  }

  const close = ()=>{
    setAddflash(false)
    setdisplaying('')
  }

  if (!isopen) return null
  return ReactDOM.createPortal(
    <>
      <div className='createnewmodal'>
        {!nameprovided&&
          <div className='initialize-flash'>
          <label className='flashsettitle'>Flashset name:</label>
          <p className='instruction'>*Please try to use the exact name as used in your school, example, math1110 or comp101</p>
          <input type='text' onChange={(event)=>{setflashsetname(event.target.value.toLocaleLowerCase())}}></input>
          <button className='startbutton' onClick={togglenameprovided}>Start</button>
        </div>
        }
        {nameprovided&&
          <div className='question-answer'>
            <label className='question'>Question/word:</label>
            <input type='text' onChange={(event)=>{setQApair((prev)=>({...prev, question:event.target.value} as flash))}} value={QApair.question}></input>
            <div className='answerdiv'>
              <label className='answer'style={style}>Answer/Meaning:</label>
              <textarea  onChange={(event)=>{setQApair((prev)=>({...prev, answer:event.target.value} as flash))}} value={QApair.answer}></textarea>
            </div>
            {added&&<p style={styles}>Added &#x2713; </p>}
            <div className='question-button'>
              <button onClick={addtoflashset}>Add new question</button>
              <button onClick={submitflashset}>Submit all added questions</button>
            </div>
          </div>
        }
        <div className='closebutton'>
          <button onClick={close}>Close</button>
        </div>
        <p style={{fontSize:'13px'}}>Warning: Please ensure to click "submit all added questions" when you are done.</p>
      </div>
    </>
  ,
  document.getElementById('viewmodal') as HTMLElement)
}

export default CreateNewFlashset