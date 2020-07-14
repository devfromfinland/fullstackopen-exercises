import React from 'react';
import { Entry } from '../types';
import { Segment, Icon } from 'semantic-ui-react';
import { assertNever } from '../utils/helpers';
import HealthRatingBar from '../components/HealthRatingBar';

interface Props {
  entry: Entry;
}

const EntryItem: React.FC<Props> = ({ entry }) => {
  switch (entry.type) {
    case 'HealthCheck':
      return (<Segment>
        <h3>{entry.date} <Icon name='doctor' size='large'/></h3>
        <div>
          <i>{entry.description}</i>
        </div>
        <HealthRatingBar rating={entry.healthCheckRating} showText={false} />
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