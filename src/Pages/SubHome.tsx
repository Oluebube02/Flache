
type Props={
  source:string
  title:string
  info: string
}
function SubHome({source, title, info}:Props) {
  return (
    <div className='property'>
      <img src={source}/>
      <h1>{title}</h1>
      <h2>{info}</h2>
    </div>
  )
}

export default SubHome