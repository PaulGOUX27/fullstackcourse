import Country from "./Country";
import React from "react";

const Countries = ({countries}) => {
    if (countries.length > 10) {
        return (<div>To many match, specify another filter</div>)
    }

    if (countries.length === 1) {
        return (<Country country={countries[0]}/>);
    }

    return (
        countries.map(country => <div key={country.alpha2Code}>{country.name}</div>)
    )
}

export default Countries;