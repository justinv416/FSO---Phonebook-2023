import React from 'react'

const PersonForm = ({handleNewPerson, newName, handleNewName, newNumber, handleNewNumber}) => {
  return (
    <form onSubmit={handleNewPerson}>
        <h2>Add a new contact</h2>
        <div>
          name: <input value={newName} onChange={handleNewName} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNewNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
    </form>
  )
}

export default PersonForm