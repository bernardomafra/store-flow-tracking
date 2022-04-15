export default function sendChromeMessage(data: {
  type: string;
  payload: string;
}) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(data, function (response) {
      //eslint-disable-line no-undef
      if (response) {
        resolve(response);
      } else {
        reject('browserAction not open');
      }
    });
  });
}
