import moment from 'moment';

export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export const isDate = (date: string): boolean => {
  return moment(date, 'YYYY-MM-DD', true).isValid();
};