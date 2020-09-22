import React, {useEffect, useState} from 'react'
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Numbers from "./components/Numbers";
import personService from './service/person';

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filter, setFilter] = useState('');

    useEffect(() => {
        personService.getAll()
            .then(response => {
                setPersons(response)
            });
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

        const newPerson = {
            name: newName,
            number: newNumber
        };

        if (persons.some(person => person.name.toLowerCase() === newName.toLowerCase())) {
            if (window.confirm(
                `${newPerson.name} is already added to phonebook, replace the old number with the new one ?`)
            ) {
                const id = persons.find(person => person.name.toLowerCase() === newName.toLowerCase()).id
              personService.update(id, newPerson)
                  .then(() => {
                      personService.getAll()
                          .then(response => {
                              setPersons(response)
                          });
                  })
            }
            return;
        }

        personService.create(newPerson)
            .then(() => {
                personService.getAll()
                    .then(response => {
                        setPersons(response)
                    });
            })

        setNewName('');
        setNewNumber('');
    }

    const handleDelete = (person) => {
        if (window.confirm(`Delete ${person.name} ?`)) {
            personService.remove(person.id)
                .then(() => {
                        personService.getAll()
                            .then(response => {
                                setPersons(response)
                            });
                    }
                );
        }
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
            <Numbers persons={filteredPersons} handleDelete={handleDelete}/>
        </div>
    )
}

export default App