import React, { useEffect, useState } from 'react';
import { socket } from '../../socket';
import { RollScreen } from './RollScreen';
import { NameView } from './NameView';


export const Student = () => {
  const [seeNameView, setSeeNameView] = useState(true)
  const [username, setUsername] = useState('')

  // lifecycle
  useEffect(() => {
    socket.connect();

    return () => {
      // disconnect
    };
  }, []);

  return (
    <div className="App">
      {seeNameView ? 
        <NameView username={username} setUsername={setUsername} finished={() => setSeeNameView(false)} /> :
        <RollScreen username={username} />
      }
    </div>
  );
}

