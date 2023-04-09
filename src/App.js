import { useState, useEffect } from 'react'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import axios from 'axios';

// const promise = axios.get('http://localhost:3001/persons');

// promise.then(response => {
//   console.log(response)
// })

const App = () => {
  const [persons, setPersons] = useState([]); 
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterPerson, setFilterPerson] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log(response.data)
        setPersons(response.data)
      })
  }, [])

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

    // Alert if same person exists
    if(persons.find((person) => person.name === newPerson.name)) {
      alert(`${newName} already exists`)
      return false
    } else {
      setPersons(persons.concat(newPerson))
    }
  }

  // Switch for filtered contacts
  const personsToShow = filterPerson ? persons.filter(person => person.name.toLowerCase().includes(filterPerson)) : persons
 
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleSearch={handleSearch} filterPerson={filterPerson}/>
      <PersonForm handleNewPerson={handleNewPerson} newName={newName} handleNewName={handleNewName} newNumber={newNumber} handleNewNumber={handleNewNumber}/>
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow}/>
    </div>
  )
}

export default App
