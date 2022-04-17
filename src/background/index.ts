import io from 'socket.io-client';
import { messagePayloads, messageTypes } from '../constants';
import { StorageSocketData } from '../global';
import { getStorageDataToBeUpdated } from '../utils/getStorageDataToBeUpdated';
import getUserProfile from '../utils/getUserProfile';
import { hasWebsiteRegisteredOn } from '../utils/hasWebsiteRegisteredOn';
import { notify } from '../utils/notify';
import readSyncStorageData from '../utils/readSyncStorageData';
import sendChromeMessage from '../utils/sendChromeMessage';

// const url = process.env.REACT_APP_STORE_FLOW_NOTIFIER_BASE_URL || '';
const url = 'https://store-flow-notifier.herokuapp.com';

const socket = io(url.concat('/user'), {
  transports: ['websocket'],
});

// const socket = io('http://localhost:5509/user', {
//   transports: ['websocket'],
// });

socket.on('error', (error) => {
  notify('error', error.toString(), '');
});

socket.on('connect', async () => {
  try {
    const { id } = await getUserProfile();
    socket.emit('new-user', id);
    sendChromeMessage({
      type: messageTypes.CONNECTION_CHANGE,
      payload: messagePayloads.CONNECTED,
    });
  } catch (err: any) {
    notify('error at connecting', err?.message || '', '');
    console.log(err);
  }
});

socket.on('step', async (data) => {
  notify('info', data.toString(), '');
  console.log('Message from server ', data);

  try {
    const message = typeof data === 'string' ? JSON.parse(data) : data;
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
    notify(`${socket.id} disconnected`, messageTypes.CONNECTION_CHANGE, '');
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
