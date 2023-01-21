import React from 'react'


type Addprops ={
  setaddflash: React.Dispatch<React.SetStateAction<boolean>>
  isdisplaying:boolean
  displaying:string
  setIsDisplaying: React.Dispatch<React.SetStateAction<string>>
}
function AddflashSet({setaddflash, displaying, setIsDisplaying}:Addprops) {

  const Open = () =>{
    if (displaying===''){
      setIsDisplaying('view')
      setaddflash((prev)=>!prev)
    }

  }

  return (
    
    <div className='addflashset'>
      <div><button className='addflashsetbutton' onClick={Open}>Add new</button></div>
    </div>
    
  )
}

export default AddflashSet