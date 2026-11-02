import React from 'react'

const Nostate = ({text = "Record not found"}) => {
  return (
    <div>
      <div className='text-center py-5'>{text}</div>
    </div>
  )
}

export default Nostate
