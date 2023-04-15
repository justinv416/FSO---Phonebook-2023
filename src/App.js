import personService from './services/persons';
import { useState, useEffect } from 'react'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Person from './components/Person';

const App = () => {
  const [persons, setPersons] = useState([]); 
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterPerson, setFilterPerson] = useState('');

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const toggleImportanceOf = (id) => {
    const person = persons.find(person => person.id === id)
    const changedPerson = {
      ...person, important: !person.important
    }
    personService
      .update(id, changedPerson)
      .then(response => {
        setPersons(persons.map(person => person.id !== id ? person : response.data))
      })
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
        }
      })
  }

  // Switch for filtered contacts
  const personsToShow = filterPerson ? persons.filter(person => person.name.toLowerCase().includes(filterPerson)) : persons
 
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleSearch={handleSearch} filterPerson={filterPerson}/>
      <PersonForm handleNewPerson={handleNewPerson} newName={newName} handleNewName={handleNewName} newNumber={newNumber} handleNewNumber={handleNewNumber}/>
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map(person => <Person 
          key={person.name}
          person={person}
          toggleImportant={() => toggleImportanceOf(person.id)}
        />)}
      </ul>
    </div>
  )
}

export default App
