import { StorageSocketData } from '../global';

export function getStorageDataToBeUpdated(
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
