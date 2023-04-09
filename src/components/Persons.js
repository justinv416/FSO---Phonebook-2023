import React from 'react'

const Persons = ({personsToShow}) => {
  return (
    <div>
        {personsToShow.map((person) => <p>{person.name} {person.number}</p>)}
    </div>
  )
}

export default Persons