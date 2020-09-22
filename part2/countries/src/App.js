import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Countries from "./component/Countries";

function App() {
    const [countries, setCountries] = useState([])
    const [filter, setFilter] = useState('');

    useEffect(() => {
        axios.get(`https://restcountries.eu/rest/v2/all`)
            .then(response => {
                setCountries(response.data);
            })
    }, [])

    // This solution is better, but need to throttle it. I didn't succeed during implementation
    /*
    useEffect(() => {
            if (!filter) {
                setCountries([]);
                return;
            }
            axios.get(`https://restcountries.eu/rest/v2/name/${filter}`)
                .then(response => {
                    setCountries(response.data);
                })
    }, [filter])
    */

    const handleFilter = (event) => {
        setFilter(event.target.value)
    }

    const filteredCountries =
        !filter ? [] : countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))

    return (
        <div className="App">
            Find countries
            <input value={filter} onChange={handleFilter}/>
            <Countries countries={filteredCountries} handleShow={handleFilter}/>
        </div>
    );
}

export default App;
