import React from 'react'
import "./Reviewbar.css";
import { FaRegCircleUser } from "react-icons/fa6";

const Reviewbar = () => {
  return (
    <div className='reviewbar'>
        <div className='userinfo'>
        <FaRegCircleUser style={{ fontSize: '25px', color:'#92e3a9', margin:'5px' }} />

            USER 1 - IIT
        </div>
        <div className="feedback">
            qwertyyuiop
        </div>
    </div>
  )
}

export default Reviewbar;