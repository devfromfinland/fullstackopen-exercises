import express from 'express';
import patientService from '../services/patientService';
import { correctNewPatientInput } from '../utils/helpers';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(JSON.stringify(patientService.getNonSensitivePatients()));
});

router.post('/', (req, res) => {
  try {
    const patient = correctNewPatientInput(req.body);
    const newPatient = patientService.addPatient(patient);
    res.send(JSON.stringify(newPatient));
  } catch (e) {
    const err:Error = e as Error;
    res.status(400).send(err.message);
  }
});

export default router;