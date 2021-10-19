// @ts-nocheck
import { io } from 'socket.io-client';
import { StorageSocketData } from '../global';
import notify from '../utils/notify';

const readStorage = async (key) => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get([key], function (result) {
      if (result[key] === undefined) {
        reject();
      } else {
        resolve(result[key]);
      }
    });
  });
};

export default function getIO() {
  chrome.identity.getProfileUserInfo((user) => {
    const ioClient = io('http://localhost:3030', {
      query: {
        userId: user.id || '',
      },
    });

    ioClient.on('ws_sfa::STEP', (data) => {
      const message = JSON.parse(data);
      notify(message.step, message.website);

      let socketData: StorageSocketData[] = [message];
      chrome.storage.sync.get(['dataSocket'], async function (result) {
        const storageData = await readStorage('dataSocket');
        if (result['dataSocket']?.length) {
          socketData = [...storageData, message];
        }

        chrome.storage.sync.set({ dataSocket: socketData });
      });
    });
  });
}
