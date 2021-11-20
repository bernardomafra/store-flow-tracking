export default async function readSyncStorageData(key: string) {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get([key], function (result) {
      if (result[key] === undefined || chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(result[key]);
      }
    });
  });
}
