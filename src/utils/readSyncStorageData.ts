export default async function readSyncStorageData(key: string) {
  const data = await chrome.storage.sync.get(key);
  return data[key] || [];
}
