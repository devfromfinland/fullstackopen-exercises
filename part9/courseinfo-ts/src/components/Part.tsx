import React from 'react';
import { CoursePart } from '../types';
import { assertNever } from '../utils/helpers';

const Part: React.FC<{ course: CoursePart }> = ({ course }) => {
  switch (course.name) {
    case 'Fundamentals':
      return (
        <div style={{ marginBottom: 16 }}>
          <div>Course: {course.name}</div>
          <div>Description: {course.description}</div>
          <div>Exercise count: {course.exerciseCount}</div>
        </div>
      )
    case 'Using props to pass data':
      return (
        <div style={{ marginBottom: 16 }}>
          <div>Course: {course.name}</div>
          <div>Group project count: {course.groupProjectCount}</div>
          <div>Exercise count: {course.exerciseCount}</div>
        </div>
      )
    case 'Deeper type usage':
      return (
        <div style={{ marginBottom: 16 }}>
          <div>Course: {course.name}</div>
          <div>Description: {course.description}</div>
          <div>Exercise count: {course.exerciseCount}</div>
          <div>Submission link: {course.exerciseSubmissionLink}</div>
        </div>
      )
    default:
      return assertNever(course);
  }
}

export default Part;