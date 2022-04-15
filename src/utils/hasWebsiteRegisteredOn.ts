import { StorageSocketData } from '../global';

export function hasWebsiteRegisteredOn(
  socketData: StorageSocketData[],
  website: string,
) {
  return socketData.some((data) => data.website === website);
}
