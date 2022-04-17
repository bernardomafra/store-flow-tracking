export default function sendChromeMessage(data: {
  type: string;
  payload: string;
}) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(data, function (response) {
      if (!chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      }
      //eslint-disable-line no-undef
      if (response) {
        resolve(response);
      } else {
        resolve('browserAction not open');
      }
    });
  });
}
