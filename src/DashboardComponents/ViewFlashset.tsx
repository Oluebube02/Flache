import React, { useReducer, useState } from 'react'
import ReactDOM  from 'react-dom'
import { flashsubset } from '../types'

type Scroll={
  location:number
  forwardDisabled:boolean
  backwardDisabled:boolean
}
type Props ={
  flashset:flashsubset
  close:() => void
}
function ViewFlashset({flashset, close}: Props) {
  const initialstate : Scroll = {location:0, forwardDisabled:false, backwardDisabled:true}
  const [viewquestion, setViewQuestion] = useState<boolean>(true)
  const reducer = (state:Scroll, action:string)=>{
    setViewQuestion(true)
    switch (action){
      case 'forward':
        let data:Scroll
        if (state.location>=flashset.course.length-1){
          data = {...state, forwardDisabled:true, backwardDisabled:false}
        }else{
          data = {...state, location:state.location+1, backwardDisabled:false}
        }
        return data
      case 'backward':
        let data2:Scroll
        if (state.location<=0){
          data2 = {...state, forwardDisabled:false, backwardDisabled:true}
        }else{
          data2 = {...state, location:state.location-1, backwardDisabled:false}
        }
        return data2
      default:
        return state
    }
  }
  const [flashdisplay, dispatch]= useReducer(reducer, initialstate)
  
  
  return ReactDOM.createPortal(
    <>
      <div className='viewmodaldiv'>
        <div className='QAdiv'>
          <div>{viewquestion?flashset.course[flashdisplay.location].question:flashset.course[flashdisplay.location].answer}</div>
          <button onClick={()=>setViewQuestion((prev)=>!prev)}>{viewquestion?"View Answer":"View Question"}</button>
        </div>
        <div className='button-div'>
          <button onClick={()=>dispatch('backward')} disabled={flashdisplay.backwardDisabled}>Previous</button>
          {flashdisplay.location+1}/{flashset.course.length}
          <button onClick={()=>dispatch('forward')} disabled={flashdisplay.forwardDisabled}>Next</button>
        </div>
        <div className='close-button' onClick={close}><button>Close</button></div>

      </div>
    </>
    ,
  document.getElementById('viewmodal') as HTMLElement)
}

export default ViewFlashset