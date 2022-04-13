import React, { useEffect, useState } from 'react';
import './App.css';

import { StorageSocketData } from './global';
import StepList from './components/StepList';
import readSyncStorageData from './utils/readSyncStorageData';
import Options from './options/Options';
import { Product } from './components/Product';

function App() {
  const [socketData, setSocketData] = useState<StorageSocketData[]>();

  const getSocketData = async () => {
    try {
      const dataSocketOnStorage: StorageSocketData[] =
        (await readSyncStorageData(
          'dataSocket',
        )) as unknown as StorageSocketData[];
      setSocketData(dataSocketOnStorage);
    } catch (error) {
      setSocketData(undefined);
    }
  };

  chrome.storage.onChanged.addListener(({ dataSocket }) => {
    const oldValue = dataSocket?.oldValue;
    const newValue = dataSocket?.newValue;
    if (JSON.stringify(oldValue) !== JSON.stringify(newValue))
      setSocketData(newValue as StorageSocketData[]);
  });

  useEffect(() => {
    getSocketData();
  }, []);

  if (socketData?.length) {
    return <StepList data={socketData} />;
  }

  return (
    <div className="App">
      <Options />
      <Product />
    </div>
  );
}

export default App;
