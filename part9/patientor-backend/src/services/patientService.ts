import patientData from '../../data/patients.json';
import { Patient, NonSensitivePatient, NewPatient } from '../types';
import { v4 as uuid } from 'uuid';
import { correctNewPatientInput } from '../utils/helpers';

const patients: Patient [] = patientData.map(item => {
  const correctData = correctNewPatientInput(item) as Patient;
  correctData.id = item.id;
  return correctData;
});

const getPatients = (): Array<Patient> => {
  return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
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

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient
};