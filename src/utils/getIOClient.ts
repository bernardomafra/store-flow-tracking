// @ts-nocheck
import { io } from 'socket.io-client';
import notify from '../utils/notify';

export default function getIO() {
  chrome.identity.getProfileUserInfo((user) => {
    const ioClient = io('http://localhost:3030', {
      query: {
        userId: user.id || '',
      },
    });

    ioClient.on('ws_sfa::STEP', (stepMsg) => {
      notify('Website Step', stepMsg);
      chrome.runtime.sendMessage({ msg: 'socket', data: stepMsg });
    });
  });
}
