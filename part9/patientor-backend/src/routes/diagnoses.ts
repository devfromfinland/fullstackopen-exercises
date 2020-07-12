import express from 'express';
import diagnoseService from '../services/diagnoseService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(JSON.stringify(diagnoseService.getDiagnoses()));
});

router.get('/:code', (req, res) => {
  const code = req.params.code;
  const found = diagnoseService.getDiagnose(code);
  found
    ? res.send(JSON.stringify(found))
    : res.status(400).send('diagnose code not found');
});

export default router;