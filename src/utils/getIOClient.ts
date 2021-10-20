// @ts-nocheck
import { io } from 'socket.io-client';
import { StorageSocketData } from '../global';
import notify from '../utils/notify';
import readSyncStorageData from './readSyncStorageData';

function hasWebsiteRegisteredOn(
  socketData: StorageSocketData[],
  website: string,
) {
  return socketData.some((data) => data.website === website);
}

function getStorageDataToBeUpdated(
  currentData: StorageSocketData[],
  newDataToSet: StorageSocketData,
) {
  const updatedData = currentData;
  const indexOfDataToUpdate = currentData.findIndex(
    (item) => item.website === newDataToSet.website,
  );
  updatedData[indexOfDataToUpdate] = newDataToSet;
  return updatedData;
}

export default function getIO() {
  chrome.identity.getProfileUserInfo((user) => {
    const ioClient = io('http://localhost:3030', {
      query: {
        userId: user.id || '',
      },
    });

    ioClient.on('ws_sfa::STEP', (data) => {
      const message: StorageSocketData = JSON.parse(data);
      notify(message.step, message.website);

      let socketData: StorageSocketData[] = [message];
      chrome.storage.sync.get(['dataSocket'], async function (result) {
        const storageData: StorageSocketData[] = await readSyncStorageData(
          'dataSocket',
        );
        if (result['dataSocket']?.length) {
          if (hasWebsiteRegisteredOn(storageData, message.website)) {
            socketData = getStorageDataToBeUpdated(storageData, message);
          } else socketData = [...storageData, message];
        }

        chrome.storage.sync.set({ dataSocket: socketData });
      });
    });
  });
}
