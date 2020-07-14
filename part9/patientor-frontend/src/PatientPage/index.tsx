import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useStateValue } from "../state";
import { apiBaseUrl } from '../constants';
import { Patient, HealthCheckEntry, OccupationalHealthcareEntry, HospitalEntry, EntryInput2 } from '../types';
import { Icon, Button } from 'semantic-ui-react';
import Entries from './Entries';
import AddEntryModal from '../AddEntryModal';

const PatientPage: React.FC = () => {
  const [{ patients }, dispatch] = useStateValue();
  
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  const { id } = useParams<{ id: string}>();
  const patient = patients[id] ? patients[id] : undefined;

  const updatePatient = async () => {
    try {
      const { data: patientFromApi } = await axios.get<Patient>(
        `${apiBaseUrl}/patients/${id}`
      );

      if (patientFromApi) {
        dispatch({ type: 'UPDATE_PATIENT', payload: patientFromApi });
      }
    } catch (e) {
      console.error(e.response.data);
    }
  };

  const openModal = (): void => {
    setModalOpen(true);
  };

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryInput2) => {
    try {
      const { date, description, specialist, diagnosisCodes} = values;

      const requestUrl = `${apiBaseUrl}/patients/${id}/entries`;
      
      switch (values.type) {
        case 'HealthCheck':
          const dataHealthCheck: Omit<HealthCheckEntry, 'id'> = {
            type: values.type,
            date,
            description,
            specialist,
            diagnosisCodes,
            healthCheckRating: values.healthCheckRating
          };
          // console.log('data', dataHealthCheck);

          const { data: newEntry1 } = await axios.post(
            requestUrl,
            dataHealthCheck
          );
          // console.log('result', newEntry1);

          dispatch({ type: 'ADD_ENTRY', payload: { patientId: id, entry: newEntry1 } });
          break;
        case 'Hospital':
          const dataHospital: Omit<HospitalEntry, 'id'> = {
            type: values.type,
            date,
            description,
            specialist,
            diagnosisCodes,
            discharge: {
              date: values.dischargeDate,
              criteria: values.criteria
            }
          };
          // console.log('data', dataHospital);

          const { data: newEntry2 } = await axios.post(
            requestUrl,
            dataHospital
          );
          // console.log('result', newEntry2);
          dispatch({ type: 'ADD_ENTRY', payload: { patientId: id, entry: newEntry2 } });
          break;
        case 'OccupationalHealthcare':
          const dataOccupationalHealthcare: Omit<OccupationalHealthcareEntry, 'id'> = {
            type: values.type,
            date,
            description,
            specialist,
            diagnosisCodes,
            employerName: values.employerName,
            sickLeave: {
              startDate: values.startDate,
              endDate: values.endDate
            }
          };
          // console.log('data', dataOccupationalHealthcare);

          const { data: newEntry3 } = await axios.post(
            requestUrl,
            dataOccupationalHealthcare
          );
          // console.log(newEntry3);
          dispatch({ type: 'ADD_ENTRY', payload: { patientId: id, entry: newEntry3 } });
          break;
        default:
          break;
      }

      // dispatch to update state (add new entry)

      closeModal();
    } catch (e) {
      console.log(e.response.data);
      setError(e.response.data.error);
    }
  };

  if (!patient) {
    return (
      <div>This patient does not exist</div>
    );
  }

  if (!patient.ssn) {
    updatePatient(); // first time check this patient, fetch other data from DB and update state
  }

  return (
    <div>
      <h1>
        {patient.name} {patient.gender === 'male'
          ? <Icon name='mars'/>
          : <Icon name='venus'/>
        }
      </h1>
      <div>
        ssn: {patient.ssn}
      </div>
      <div>
        occupation: {patient.occupation}
      </div>

      <AddEntryModal
        modalOpen={modalOpen}
        onClose={closeModal}
        error={error}
        onSubmit={submitNewEntry}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>

      {patient.entries && <div style={{ marginTop: 20 }}>
        <h3>entries</h3>
        <Entries entries={patient.entries}/>
      </div>}

    </div>
  );
};

export default PatientPage;