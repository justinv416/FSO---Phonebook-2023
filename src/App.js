/* TODO: 
1. delete functionality still leaving button until refresh
2.add update number functionality
*/

import personService from './services/persons';
import { useState, useEffect } from 'react'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Person from './components/Person';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]); 
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterPerson, setFilterPerson] = useState('');
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const deleteContact = (id) => {
    const person = persons.find(person => person.id === id)
    const msg = `Delete ${person.name}?`
    const confirm = window.confirm(msg)
    if (confirm) {
      personService
      .deletePerson(id)
      .then(response => {
          setPersons(persons.map(person => person.id !== id ? person : response.data))
        })
    }
    
  }

  // Sets new name 
  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  // Sets new number
  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  // Search for existing contact
  const handleSearch = (event) => {
    setFilterPerson(event.target.value)
  }

  // Add new person to phonebook
  const handleNewPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }

    personService
      .create(newPerson)
      .then(response => {
        // Alert if same person exists
        if(persons.find((person) => person.name === newPerson.name)) {
          alert(`${newName} already exists`)
          return false
        } else {
          setPersons(persons.concat(response.data))
          setErrorMessage(`${newName} added to the phonebook`);
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        }
      })
  }

  // Switch for filtered contacts
  const personsToShow = filterPerson ? persons.filter(person => person.name.toLowerCase().includes(filterPerson)) : persons
 
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage}/>
      <Filter handleSearch={handleSearch} filterPerson={filterPerson}/>
      <PersonForm handleNewPerson={handleNewPerson} newName={newName} handleNewName={handleNewName} newNumber={newNumber} handleNewNumber={handleNewNumber}/>
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map(person => <Person 
          key={person.name}
          person={person}
          deleteContact={() => deleteContact(person.id)}
        />)}
      </ul>
    </div>
  )
}

export default App
