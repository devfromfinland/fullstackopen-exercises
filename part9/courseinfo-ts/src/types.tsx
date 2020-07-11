export interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

export interface CoursePartOne extends CoursePartBase {
  name: 'Fundamentals';
  description: string;
}

export interface CoursePartTwo extends CoursePartBase {
  name: 'Using props to pass data';
  groupProjectCount: number;
}

export interface CoursePartThree extends CoursePartBase {
  name: 'Deeper type usage';
  description: string;
  exerciseSubmissionLink: string;
}

export interface CoursePartBase2 extends CoursePartBase {
  description: string;
  // I don't understand the exercise regarding this new interface
}

export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree;