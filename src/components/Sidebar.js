import React, {useEffect} from 'react'
import './Sidebar.css'
export default function Sidebar() {
    useEffect(() => {
        document.body.className = 'sidebar';
      }, []);
  return (
    <>
        <div className='sidebox'>
        12k
real
time
users
<hr className='hr'></hr>
1M Sub
<p  className='submissions'>missions overall</p>
        </div>
    </>
  )
}
