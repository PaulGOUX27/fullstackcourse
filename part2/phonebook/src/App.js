import React, {useEffect, useState} from 'react'
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Numbers from "./components/Numbers";
import personService from './service/person';
import Notification from "./components/Notification";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filter, setFilter] = useState('');
    const [message, setMessage] = useState(null);
    const [type, setType] = useState('success')
    const SUCCESS_NOTIF = 'success'
    const ERROR_NOTIF = 'error'

    useEffect(() => {
        personService.getAll()
            .then(response => {
                setPersons(response)
            });
    }, [])

    const setSuccessMessage = (msg) => {
        setType(SUCCESS_NOTIF);
        setMessage(msg);
        setTimeout(() => {
            setMessage(null)
        }, 5000)
    }

    const setErrorMessage = (msg) => {
        setType(ERROR_NOTIF);
        setMessage(msg);
        setTimeout(() => {
            setMessage(null)
        }, 5000)
    }

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
                    .then((person) => {
                        setSuccessMessage(`Updated ${person.name}`)
                        personService.getAll()
                            .then(response => {
                                setPersons(response)
                            });
                    })
                    .catch(() => {
                        //TODO Check status code
                        setErrorMessage(`Information about ${newName} has already been removed from server.`)
                    })
            }
            return;
        }

        personService.create(newPerson)
            .then((person) => {
                setSuccessMessage(`Created ${person.name}`)
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
                        setSuccessMessage(`Delete ${person.name}`)

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
            <h1>Phonebook</h1>
            <Notification message={message} type={type}/>
            <Filter filter={filter} handleFilter={handleFilter}/>
            <h2>Add a new</h2>
            <PersonForm handleAddPerson={handleAddPerson} handleNewName={handleNewName}
                        handleNewNumber={handleNewNumber} newName={newName} newNumber={newNumber}/>
            <h2>Numbers</h2>
            <Numbers persons={filteredPersons} handleDelete={handleDelete}/>
        </div>
    )
}

export default App