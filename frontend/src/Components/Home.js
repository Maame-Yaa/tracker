import React, {useState} from 'react'

export default function Home() {

    const [name, setName] = useState();


  return (
    <div>
    <div style={{marginTop:'10px'}}></div><br />
        <input type='text' placeholder='Search...' onChange={(e)=>setName(e.target.value)} value={name} className='searchtext'/>

    </div>
  )
}
