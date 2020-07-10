import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(JSON.stringify(patientService.getNonSensitivePatients()));
});

export default router;