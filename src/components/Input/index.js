import React from 'react'
import './styles.css'
function Input({label,state,setstate,placeholder,type}) {
  return (
    <div className='input-wrapper'>
        <p className='label-input'>{label}</p>
        <input className='custom-input'
            type={type}
            value={state}
            placeholder={placeholder}
            onChange={(e)=>setstate(e.target.value)}

        />
    </div>
  )
}

export default Input