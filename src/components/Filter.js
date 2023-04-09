import React from 'react'

const Filter = ({filterPerson, handleSearch}) => {
  return (
    <div>
        find contact: <input value={filterPerson} onChange={handleSearch} />
    </div>
  )
}

export default Filter