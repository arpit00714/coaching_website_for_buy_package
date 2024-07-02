import React, { useState } from 'react'
import "./footer.css"
function Footer() {
  const [shown ,setShown]=useState(false)
  const HandleShowFooter = ()=>{
    setShown(!shown)
  }
  return (
    <>
    <div style={{width:"30%",margin:"10px auto",display:"flex",justifyContent:"center"}}>
      <button className='Seefooterbtn' onClick={HandleShowFooter}>
        {shown? "Hide Footer" : "See Footer"}
      </button>
    </div>
    <div className={!shown?"footer":"footerActive"}></div>
    {/* <div className='footer footerActive'></div> */}
    </>
  )
}

export default Footer