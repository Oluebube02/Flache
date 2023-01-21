import React, {useState, Dispatch, useContext} from 'react'
import { flashsubset } from '../types'
import ViewFlashset from './ViewFlashset'
import {flashContext} from  '../Pages/Dashboard'
import UpdateFlash from '../DashboardComponents/UpdateFlash'

type Props ={
  subset:flashsubset
  Key:string
  displaying:string
  mine:boolean
  setIsDisplaying : Dispatch<React.SetStateAction<string>>
  addfromsearch: (flash: flashsubset) => Promise<void>
}
function FlashSetDisplay({subset, Key, displaying, mine, setIsDisplaying, addfromsearch}:Props) {
  const {update} = useContext(flashContext)
  const [isopen, setIsopen] = useState<boolean>(false)
  const [isUpdate, setIsUpdate] = useState<boolean>(false)
  const [added, setAdded] = useState<boolean>(false)

  const style ={
    color:'green',
    marginTop:'0px',
    marginBottom:'0px',
    fontSize:'12px'
  }

  const Open = () =>{
    if (displaying===''){
      setIsDisplaying(subset.coursename)
      setIsopen(true)
    }

  }
  const Close = () =>{
    setIsDisplaying('')
    setIsopen(false)
  }
  const styles ={
    backgroundColor:isopen?"purple":"white",
    color:isopen?"white":"#6237A0"
  }


  const deleteSet = ()=> {
    const decided = window.confirm("A deleted set cannot be recovered. Are you sure you want to proceed?")
    if (decided){
      update(subset, false)
    }
   
  }
  const updateCard =()=>{
    if(displaying===''){
      setIsUpdate(true)
      setIsDisplaying('update')
    }
  }
  const add = ()=>{
    addfromsearch(subset)
    setAdded(true)
    setTimeout(()=>{setAdded(false)}, 1000)
  }
  const buttonfunc = ()=>{
    mine?updateCard():add()
  }
  return (
    <div key={Key} className='flashdisplay'>
      <h2 style={{color:"black"}}>{subset.coursename.toLocaleUpperCase()}</h2>
      <button onClick={buttonfunc}>{mine?"Update Set":"Add to my set"}</button>
      {added&&<p style={style}>Added &#x2713; </p>}
      <button onClick={Open} style={styles}>{isopen?"Studying":"Study Set"}</button>
      {mine && <button onClick ={deleteSet}>Delete Set</button>}
      {isopen &&  <ViewFlashset flashset={subset} close={Close}/>}
      {isUpdate && <UpdateFlash toBeRemoved={subset} setisupdate={setIsUpdate}/>}
    </div>
  )
}

export default FlashSetDisplay