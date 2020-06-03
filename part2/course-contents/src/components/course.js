import React from 'react'

const Header = ({ course }) => {
  return (
    <h3>{course.name}</h3>
  )
}

const Total = ({ course }) => {
  const calculateSum = (parts) => parts.reduce((s, p) => s + p.exercises, 0)

  return(
    <p><strong>Total of {calculateSum(course.parts)} exercises</strong></p>
  ) 
}

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>    
  )
}

const Content = ({ course }) => {
  return (
    <div>
      { course.parts && course.parts.map(part => <Part key={part.id} part={part} /> )}
    </div>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default Course