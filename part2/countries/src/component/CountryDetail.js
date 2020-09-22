import React, {useEffect, useState} from "react";
import axios from "axios";

const CountryDetail = ({country}) => {
    const api_key = process.env.REACT_APP_API_KEY;
    const [weather, setWeather] = useState({});

    useEffect(() => {
        axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
            .then(response => {
                setWeather(response.data.current);
            })
    }, [api_key, country.capital])

    return (
        <div>
            <h1>{country.name}</h1>
            <div>Capital {country.capital}</div>
            <div>Population {country.population}</div>
            <h2>Languages</h2>
            <ul>
                {country.languages.map(lang => <li key={lang.iso639_1}>{lang.name}</li>)}
            </ul>
            <img height="150px" src={country.flag} alt='flag'/>
            <div>
                <h2>Weather in {country.capital}</h2>
                <div><b>Temparature : </b>{weather.temperature} Celcius</div>
                <img alt="" src={weather.weather_icons}/>
                <div><b>Wind : </b> {weather.wind_speed} mph direction {weather.wind_dir}</div>
            </div>
        </div>
    )
}

export default CountryDetail;