import React from "react";

const Numbers = ({persons}) => {
    return (
        <div>
            {persons.map(p => <div key={p.name}> {p.name} {p.number}</div>)}
        </div>
    )
}

export default Numbers;