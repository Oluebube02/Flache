import React, {useContext} from 'react'
import FlashSetDisplay from './FlashSetDisplay'
import AddflashSet from './AddflashSet'
import {flashContext} from  '../Pages/Dashboard'


function DisplayComponent() {
  const {flash, setAddflash, displaying, setdisplaying} = useContext(flashContext)
  const filler = async()=>{}

  const flashdisplay = () => {
    return flash.map((flashs)=><FlashSetDisplay subset={flashs} Key={flashs.coursename} displaying={displaying} mine={true} addfromsearch = {filler} setIsDisplaying ={setdisplaying}/>)
  }
  return (
    <div className='displayComp'>
      {flashdisplay()}
      <AddflashSet setaddflash ={setAddflash} isdisplaying={displaying==='view'} displaying ={displaying}setIsDisplaying={setdisplaying}/>
    </div>
  )
}

export default DisplayComponent