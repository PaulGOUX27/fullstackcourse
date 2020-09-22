import React from "react";

const Numbers = ({persons, handleDelete}) => {
    return (
        <div>
            {persons.map(p =>
                <div key={p.name}>
                    {p.name} {p.number}
                    <button onClick={() => handleDelete(p)}>
                        Delete
                    </button>
                </div>
            )}
        </div>
    )
}

export default Numbers;