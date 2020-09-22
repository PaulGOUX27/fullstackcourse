import CountryDetail from "./CountryDetail";
import React from "react";
import Country from "./Country";

const Countries = ({countries, handleShow}) => {
    if (countries.length > 10) {
        return (<div>To many match, specify another filter</div>)
    }

    if (countries.length === 1) {
        return (<CountryDetail country={countries[0]}/>);
    }

    return (
        countries.map(country => <Country key={country.alpha2Code} country={country} handleShow={handleShow}/>)
    )
}

export default Countries;