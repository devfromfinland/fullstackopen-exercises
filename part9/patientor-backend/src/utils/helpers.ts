/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatient, Gender, Entry, HealthCheckRating, Discharge, SickLeave, OccupationalHealthcareEntry, Diagnose, HealthCheckEntry, HospitalEntry } from '../types';
import { v4 as uuid } from 'uuid';

export const correctNewPatientInput = (data: any): NewPatient => {
  const correctData: NewPatient = {
    name: parseName(data.name),
    dateOfBirth: parseDate(data.dateOfBirth),
    ssn: parseSsn(data.ssn),
    gender: parseGender(data.gender),
    occupation: parseOccupation(data.occupation),
    entries: []
  };
  
  return correctData;
};

export const correctNewEntryInput = (data: any): Entry => {
  const type = parseEntryType(data.type);
  const date = parseDate(data.date);
  const specialist = parseSpecialist(data.specialist);
  const description = parseDescription(data.description);

  switch (type) {
    case 'HealthCheck':
      const newHealthEntry:HealthCheckEntry = {
        id: uuid(),
        type,
        date,
        specialist,
        description,
        healthCheckRating: parseHealthCheckRating(data.healthCheckRating)
      };
      if (data.diagnosisCodes) {
        newHealthEntry.diagnosisCodes = parseDiagnosis(data.diagnosisCodes);
      }
      return newHealthEntry;
    case 'OccupationalHealthcare':
      const newOccupationalEntry:OccupationalHealthcareEntry = {
        id: uuid(),
        type,
        date,
        specialist,
        description,
        employerName: parseEmployername(data.employerName)
      };
      if (data.sickLeave) {
        newOccupationalEntry.sickLeave = parseSickLeave(data.sickLeave);
      }
      if (data.diagnosisCodes) {
        newOccupationalEntry.diagnosisCodes = parseDiagnosis(data.diagnosisCodes);
      }
      return newOccupationalEntry;
    case 'Hospital':
      const newHospitalEntry:HospitalEntry = {
        id: uuid(),
        type,
        date,
        specialist,
        description,
        discharge: parseDischarge(data.discharge),
      };
      if (data.diagnosisCodes) {
        newHospitalEntry.diagnosisCodes = parseDiagnosis(data.diagnosisCodes);
      }
      return newHospitalEntry;
    default:
      throw new Error(`Incorrect or missing entry type: ${data}`);
  }
  
};

const parseDischarge = (text: any): Discharge => {
  const date = parseDate(text.date);
  const criteria = parseCriteria(text.criteria);
  return {
    date,
    criteria
  };
};

const parseCriteria = (text: any): string => {
  if (!text || !isString(text)) {
    throw new Error(`Incorrect or missing criteria: ${text}`);
  }
  return text;
};

const parseSickLeave = (text: any): SickLeave => {
  const startDate = parseDate(text.startDate);
  const endDate = parseDate(text.startDate);

  return {
    startDate,
    endDate
  };
};

const parseDiagnosis = (text: any): Array<Diagnose['code']> => {
  const result: Array<Diagnose['code']> = [];
  if (!Array.isArray(text)) {
    throw new Error(`Incorrect diagnose codes: ${text}`);
  }

  for (let i = 0; i < text.length; i++) {
    if (!text[i] || !isString(text[i])) {
      throw new Error(`Missing or incorrect diagnose code: ${text[i]}`);
    }
    result.push(text[i]);
  }

  return result;
};

const parseEmployername = (text: any): string => {
  if (!text || !isString(text)) {
    throw new Error(`Incorrect or missing employer name: ${text}`);
  }
  return text;
};

const parseHealthCheckRating = (text: any): HealthCheckRating => {
  if (typeof(text) === 'undefined' || text === null) {
    throw new Error(`Missing health check rating`);
  }

  const rating = Number(text);
  console.log('rating', rating, typeof(rating));
  console.log('healthy', HealthCheckRating.Healthy, typeof(HealthCheckRating.Healthy));
  switch (rating) {
    case HealthCheckRating.CriticalRisk:
    case HealthCheckRating.Healthy:
    case HealthCheckRating.HighRisk:
    case HealthCheckRating.LowRisk:
      return rating;
    default:
      throw new Error(`Incorrect health check rating: ${text}`);
  }
};

const parseDescription = (text: any): string => {
  if (!text || !isString(text)) {
    throw new Error(`Incorrect or missing entry description: ${text}`);
  }
  return text;
};

const parseSpecialist = (text: any): string => {
  if (!text || !isString(text)) {
    throw new Error(`Incorrect or missing specialist: ${text}`);
  }
  return text;
};

const parseEntryType = (text: any): string => {
  if (!text || !isString(text)) {
    throw new Error(`Incorrect or missing entry type: ${text}`);
  }
  return text;
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