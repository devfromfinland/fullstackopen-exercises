import React from 'react';
import { CoursePart } from '../types';
import Part from './Part';

const Content: React.FC<{ courses: CoursePart[] }> = ({ courses }) => {
  return (
    <>
      {courses.map(part => <Part course={part} key={part.name}/>)}
    </>
  )
}

export default Content;