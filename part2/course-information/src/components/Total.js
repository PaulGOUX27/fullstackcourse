import React from "react";

const Total = (props) => {
    return (
        <p>
            <b>
                Total of {props.parts.map(p => p.exercises).reduce((prev, next) => prev + next)} exercises
            </b>
        </p>
    )
}

export default Total;