import diagnoseData from '../../data/diagnoses.json';
import { Diagnose } from '../types';

const diagnoses: Array<Diagnose> = diagnoseData;

const getDiagnoses = (): Array<Diagnose> => {
  return diagnoses;
};

const getDiagnose = (code: string): Diagnose | undefined => {
  return diagnoses.find(item => item.code === code);
};

export default {
  getDiagnoses,
  getDiagnose
};