/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatient, Gender } from '../types';

export const correctNewPatientInput = (data: any): NewPatient => {
  const correctData: NewPatient = {
    name: parseName(data.name),
    dateOfBirth: parseDate(data.dateOfBirth),
    ssn: parseSsn(data.ssn),
    gender: parseGender(data.gender),
    occupation: parseOccupation(data.occupation)
  };
  
  return correctData;
};

const parseName = (text: any): string => {
  if (!text || !isString(text)) {
    throw new Error(`Incorrect or missing name: ${text}`);
  }
  return text;
};

const parseSsn = (text: any): string => {
  if (!text || !isString(text)) {
    throw new Error(`Incorrect or missing SSN: ${text}`);
  }
  return text;
};

const parseOccupation = (text: any): string => {
  if (!text || !isString(text)) {
    throw new Error(`Incorrect or missing occupation: ${text}`);
  }
  return text;
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender: ${gender}`);
  } 
  return gender;
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error(`Incorrect or missing date: ${date}`);
  }
  return date;
};

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};