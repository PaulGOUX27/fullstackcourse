import React, {useEffect, useState} from 'react'
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Numbers from "./components/Numbers";
import axios from 'axios'

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filter, setFilter] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3001/persons')
            .then(response => {
                setPersons(response.data)
            })
    }, [])

    const handleNewName = (event) => {
        setNewName(event.target.value);
    }

    const handleNewNumber = (event) => {
        setNewNumber(event.target.value);
    }

    const handleFilter = (event) => {
        setFilter(event.target.value)
    }

     const handleAddPerson = (event) => {
        event.preventDefault();

        if (persons.some(person => person.name.toLowerCase() === newName.toLowerCase())) {
            alert(`${newName} is already added to phonebook`);
            return;
        }

        const newPerson = {
            name: newName,
            number: newNumber
        };
        setPersons(persons.concat(newPerson));
        setNewName('');
        setNewNumber('');
    }

    const filteredPersons =
        !filter ? persons : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()));

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter filter={filter} handleFilter={handleFilter}/>
            <h3>Add a new</h3>
            <PersonForm handleAddPerson={handleAddPerson} handleNewName={handleNewName}
                        handleNewNumber={handleNewNumber} newName={newName} newNumber={newNumber}/>
            <h3>Numbers</h3>
            <Numbers    persons={filteredPersons}/>
        </div>
    )
}

export default App