import React from 'react'

const Person = ({person, toggleImportant}) => {
    const label = person.important ? 'make not important' : 'make important'
    
    return (
        <li>
            {person.name} {person.number}
            <button onClick={toggleImportant}>{label}</button>
        </li>
    )
}

export default Person