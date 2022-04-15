import io from 'socket.io-client';
import { messageTypes } from '../constants';
import { StorageSocketData } from '../global';
import { getStorageDataToBeUpdated } from '../utils/getStorageDataToBeUpdated';
import getUserProfile from '../utils/getUserProfile';
import { hasWebsiteRegisteredOn } from '../utils/hasWebsiteRegisteredOn';
import { notify } from '../utils/notify';
import readSyncStorageData from '../utils/readSyncStorageData';

const socket = io('http://localhost:5509/user', { transports: ['websocket'] });

socket.on('error', (error) => {
  notify('error', error, '');
});

socket.on('connect', async () => {
  try {
    const { id } = await getUserProfile();
    socket.emit('new-user', id);
  } catch (err) {
    console.log(err);
  }
});

socket.on('step', async (data) => {
  console.log('Message from server ', data);

  try {
    const message = JSON.parse(data);
    notify(message.step, message.website, '');

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
  } catch (newStepError) {
    console.error('error: ', newStepError);
  }
});

socket.on('disconnect', async () => {
  try {
    notify('disconnected', messageTypes.CONNECTION_CHANGE, '');
  } catch (err) {}
});

// //Add listener fro message request ....
chrome.runtime.onMessage.addListener(
  //eslint-disable-line no-undef
  (request, sender, sendResponse) => {
    console.log(request);
    switch (request.type) {
      case messageTypes.MESSAGE_TEXT:
        notify('new chrome message', messageTypes.MESSAGE_TEXT, '');
        console.log(request.message);
        break;
      default:
        break;
    }
  },
);
