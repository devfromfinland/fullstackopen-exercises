export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}

export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnose['code']>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export interface Discharge {
  date: string;
  criteria: string;
}

export interface SickLeave {
  startDate: string;
  endDate: string;
}

export interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck';
  healthCheckRating: HealthCheckRating;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: 'OccupationalHealthcare';
  employerName: string;
  sickLeave?: SickLeave;
}

export interface HospitalEntry extends BaseEntry {
  type: 'Hospital';
  discharge: Discharge;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export type EntryType = 'HealthCheck' | 'OccupationalHealthcare' | 'Hospital';

export type EntryInput = Omit<HealthCheckEntry, 'id'> 
  | Omit<OccupationalHealthcareEntry, 'id'>
  | Omit<HospitalEntry, 'id'>;

export interface EntryInput2 extends Omit<BaseEntry, 'id'> {
  type: 'HealthCheck' | 'OccupationalHealthcare' | 'Hospital';
  healthCheckRating: HealthCheckRating;
  employerName: string;
  // sickLeave?: SickLeave;
  startDate: string;
  endDate: string;
  dischargeDate: string;
  criteria: string;
}

export type HealthRatingOption = {
  value: HealthCheckRating;
  label: string;
};

export type EntryTypeOption = {
  value: EntryType;
  label: string;
};