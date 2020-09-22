import React from "react";

const Country = ({country, handleShow}) => {
    return (
        <div>
            {country.name}
            <button onClick={handleShow}>Show</button>
        </div>
    )
}

export default Country;