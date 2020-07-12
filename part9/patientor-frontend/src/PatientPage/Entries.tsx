import React from 'react';
import { Entry } from '../types';
import EntryItem from './EntryItem';

interface Props {
  entries: Entry[];
}

const Entries: React.FC<Props> = ({ entries }) => {
  return (
    <div>
      {entries && entries.map(entry => <EntryItem entry={entry} key={entry.id}/>)}
    </div>
  );
};

export default Entries;