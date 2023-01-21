//import React from 'react'


export type flash ={
  question:string
  answer : string
}

export type flashsubset = {
  coursename:string
  course: flash[]
}

export type FlashUser ={
  public:boolean
  school :string
  id:string|undefined
  flashcards:flashsubset[]
}

export type Props ={
  isAuth:boolean
}
//rgb(247, 247, 148);
// animation-duration: 2s;
// animation-iteration-count: infinite;
// animation-name: bounce-3;
// animation-timing-function: ease;

// const updateflashcards = async ()=>{
//   const collectiondata = collection(db, "flashusers")
//   //console.log("collection", collectiondata)
//   const id :string= localStorage.getItem("id") as string
//   console.log("local", id)
//   localStorage.clear()
//   const userdoc = doc(collectiondata, id)
//   console.log("user", userdoc.id, id)
//   await updateDoc(userdoc, {flashcards:arrayUnion(newflashset)})
// }