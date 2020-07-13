// import patientData from '../../data/patients.json';
import { Patient, PublicPatient, NewPatient, Entry, EntryInput } from '../types';
import { v4 as uuid } from 'uuid';
// import { correctNewPatientInput } from '../utils/helpers';
import patients from '../../data/patientsData';
import { correctNewEntryInput } from '../utils/helpers';

// const patients: Patient [] = patientData.map(item => {
//   const correctData = correctNewPatientInput(item) as Patient;
//   correctData.id = item.id;
//   if (!correctData.entries) {
//     correctData.entries = [];
//   }
//   return correctData;
// });


const getPatients = (): Array<Patient> => {
  console.log('patients', patients);
  return patients;
};

const getPatient = (id: string): Patient | undefined => {
  const patient = patients.find(item => item.id === id);
  return patient;
};

const getNonSensitivePatients = (): PublicPatient[] => {
  return patients.map(({id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (data: NewPatient): Patient => {
  const id: string = uuid();
  const newPatient = {
    ...data,
    id
  };

  // console.log(newPatient);
  patients.push(newPatient);
  return newPatient;
};

const addEntry = (patientId: string, input: EntryInput): Entry => {
  const newEntry = correctNewEntryInput(input);
  
  const foundIndex = patients.findIndex(item => item.id === patientId);
  patients[foundIndex].entries.push(newEntry);

  return newEntry;
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient,
  getPatient,
  addEntry,
};