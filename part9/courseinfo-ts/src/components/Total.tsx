import React from "react";
import { CoursePartBase } from '../types'

const Total: React.FC<{ courses: CoursePartBase[] }> = ({ courses }) => {
  return (
    <p>
      Number of exercises{" "}
      {courses.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  )
}

export default Total;