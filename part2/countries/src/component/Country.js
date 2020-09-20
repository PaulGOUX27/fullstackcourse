import React from "react";

const Country = ({country}) => {

    return (
        <div>
            <h1>{country.name}</h1>
            <div>Capital {country.capital}</div>
            <div>Population {country.population}</div>
            <h2>Languages</h2>
            <ul>
                {country.languages.map(lang => <li key={lang.iso639_1}>{lang.name}</li>)}
            </ul>
            <img src={country.flag} alt='flag'/>
        </div>
    )
}

export default Country;