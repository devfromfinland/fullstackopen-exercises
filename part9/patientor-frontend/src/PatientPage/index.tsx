import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useStateValue } from "../state";
import { apiBaseUrl } from '../constants';
import { Patient } from '../types';
import { Icon } from 'semantic-ui-react';
import Entries from './Entries';

const PatientPage: React.FC = () => {
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string}>();
  const [patient, setPatient] = useState<Patient | undefined>(undefined);

  useEffect(() => {
    const updatePatient = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );

        if (patientFromApi) {
          dispatch({ type: 'UPDATE_PATIENT', payload: patientFromApi });
          setPatient(patientFromApi);
        }
      } catch (e) {
        console.error(e.response.data);
      }
    };

    if (patients[id] && !patients[id].ssn) {
      console.log('update state');
      updatePatient();
    } else {
      console.log('no need to update state');
      setPatient(patients[id]);
    }
  }, [id]);

  if (!patient) {
    return (
      <div>No data. Go back to home page please.</div>
    );
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

      {patient.entries && <div style={{ marginTop: 20 }}>
        <h3>entries</h3>
        <Entries entries={patient.entries}/>
      </div>}

    </div>
  );
};

export default PatientPage;