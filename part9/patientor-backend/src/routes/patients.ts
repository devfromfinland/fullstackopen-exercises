import express from 'express';
import patientService from '../services/patientService';
import { correctNewPatientInput } from '../utils/helpers';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(JSON.stringify(patientService.getNonSensitivePatients()));
});

router.get('/:id', (req, res) => {
  try {
    // console.log('request', req);
    // console.log('request params', req.params);
    const id: string = req.params.id;
    const patient = patientService.getPatient(id);

    patient
      ? res.send(JSON.stringify(patient))
      : res.status(400).send(`Couldn't find the patient in database`);
    
  } catch (e) {
    const err: Error = e as Error;
    res.status(400).send(err.message);
  }
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

router.post('/:id/entries', (req, res) => {
  try {
    const id: string = req.params.id;
    // console.log('request received', req.body);
    const newEntry = patientService.addEntry(id, req.body);
    res.send(JSON.stringify(newEntry));
  } catch (e) {
    const err:Error = e as Error;
    res.status(400).send(err.message);
  }
});

export default router;