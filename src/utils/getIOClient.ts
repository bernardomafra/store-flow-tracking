// @ts-nocheck
import { StorageSocketData } from '../global';
import { notify } from '../utils/notify';
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
    // const socket = new WebSocket('ws://store-flow-notifier.herokuapp.com');
    const socket = new WebSocket('ws://localhost:3000');

    socket.addEventListener('open', function (event) {
      console.log('Connection established');
      socket.send(JSON.stringify({ user }));
      const query = {
        type: 'new-user',
        userId: user.id || '',
      };

      socket.send(JSON.stringify(query));

      socket.addEventListener('message', async function (event) {
        console.log(event);
        console.log('Message from server ', event.data);

        try {
          const message = JSON.parse(event.data);
          console.log('message: ', message);
          if (message.type === 'new-step') {
            console.log('is new step', message.step);
            notify(message.step, message.website);

            let socketData: StorageSocketData[] = [message];
            const storageData: StorageSocketData[] = await readSyncStorageData(
              'dataSocket',
            );
            if (storageData?.length) {
              if (hasWebsiteRegisteredOn(storageData, message.website)) {
                socketData = getStorageDataToBeUpdated(storageData, message);
              } else socketData = [...storageData, message];
            }
            chrome.storage.sync.set({ dataSocket: socketData });
            const updated = await readSyncStorageData('dataSocket');
            console.log('dataSocket: ', updated);
          }
        } catch (newStepError) {
          console.error('error: ', newStepError);
        }
      });
    });
  });
}
