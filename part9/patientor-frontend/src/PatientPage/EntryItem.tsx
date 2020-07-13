import React, { useEffect, useState } from 'react';
import { Entry, Diagnose } from '../types';
import { apiBaseUrl } from '../constants';
import axios from 'axios';
import { Segment, Icon } from 'semantic-ui-react';
import { assertNever } from '../utils/helpers';
import HealthRatingBar from '../components/HealthRatingBar';

interface Props {
  entry: Entry;
}

const EntryItem: React.FC<Props> = ({ entry }) => {
  const [diagnoses, setDiagnoses] = useState<Diagnose[]>([]);

  useEffect(() => {
    const getDiagnoses = async (codes: string[]) => {
      const results: Diagnose[] = [];
      for (let i = 0; i < codes.length; i++) {
        try {
          const { data: diagnose } = await axios.get<Diagnose>(
            `${apiBaseUrl}/diagnoses/${codes[i]}`
          );
  
          if (diagnose) {
            results.push(diagnose);
          }
        } catch (e) {
          console.error(e.response.data);
        }
      }
      console.log('results', results);
      setDiagnoses(results);
    };

    const codes = entry.diagnosisCodes;
    if (codes) {
      getDiagnoses(codes);
    }
    console.log(diagnoses);
  }, [entry]);

  // const ratingIcon = (rating: HealthCheckRating) => {
  //   switch (rating) {
  //     case 0:
  //       return <Icon name='heart' color='green'/>;
  //     case 1:
  //       return <Icon name='heart' color='olive'/>;
  //     case 2:
  //       return <Icon name='heart' color='orange'/>;
  //     case 3:
  //       return <Icon name='heart' color='red'/>;
  //     default:
  //       return '...';
  //   }
  // };

  switch (entry.type) {
    case 'HealthCheck':
      return (<Segment>
      <h3>{entry.date} <Icon name='doctor' size='large'/></h3>
      <div>
        <i>{entry.description}</i>
      </div>
      <HealthRatingBar rating={entry.healthCheckRating} showText={false} />
      {/* <div>
        {ratingIcon(entry.healthCheckRating)}
      </div> */}
    </Segment>);
    case 'Hospital':
      return (<Segment>
        <h3>{entry.date} <Icon name='hospital' size='large'/></h3>
        <div>
          <i>{entry.description}</i>
        </div>
        
      </Segment>);
    case 'OccupationalHealthcare':
      return (<Segment>
        <h3>{entry.date} <Icon name='stethoscope' size='large'/> {entry.employerName}</h3>
        <div>
          <i>{entry.description}</i>
        </div>
      </Segment>);
    default:
      return assertNever(entry);
  }
};

export default EntryItem;