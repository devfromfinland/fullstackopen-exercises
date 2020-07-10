import patientData from '../../data/patients.json';
import { Patient, NonSensitivePatient } from '../types';
// import { NonSensitivePatient } from "../NonSensitivePatient";

const patients: Array<Patient> = patientData;

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

export default {
  getPatients,
  getNonSensitivePatients
};