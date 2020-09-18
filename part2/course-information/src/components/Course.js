import Header from "./Header";
import Content from "./Content";
import Total from "./Total";
import React from "react";

const Course = ({course}) => {
    return (
        <div>
            <Header course={course.name}/>
            <Content parts={course.parts}/>
            <Total parts={course.parts}/>
        </div>
    )
}

export default Course;