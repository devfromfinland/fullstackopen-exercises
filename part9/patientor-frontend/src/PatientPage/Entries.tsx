import React from 'react';
import { Entry } from '../types';
import EntryItem from './EntryItem';

interface Props {
  entries: Entry[];
}

const Entries: React.FC<Props> = ({ entries }) => {
  return (
    <div>
      {entries && entries.length > 0
        ? entries.map(entry => <EntryItem entry={entry} key={entry.id}/>)
        : 'no entry to show'
      }
    </div>
  );
};

export default Entries;