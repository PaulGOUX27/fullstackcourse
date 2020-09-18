import React, {useState} from 'react'
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Numbers from "./components/Numbers";

const App = () => {
    const [persons, setPersons] = useState([
        {name: 'Arto Hellas', number: '040-123456'},
        {name: 'Ada Lovelace', number: '39-44-5323523'},
        {name: 'Dan Abramov', number: '12-43-234345'},
        {name: 'Mary Poppendieck', number: '39-23-6423122'}
    ]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filter, setFilter] = useState('');

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

        if (persons.some(person => person.name === newName)) {
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