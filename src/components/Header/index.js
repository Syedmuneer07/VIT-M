import React from 'react'
import './styles.css'
function Header() {
  function logoutFnc(){
    alert("Logged Out")
  }
  return (
    <div className="navbar">
      <p className='logo'>VIT-M.</p>
      <p className='link' onClick={logoutFnc}>LogOut</p>
    </div>
  )
}

export default Header