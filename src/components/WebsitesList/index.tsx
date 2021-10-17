import React, { useEffect } from 'react';
import { useFiles } from '../../context/files';

import Upload from '../Upload';

export default function WebsitesList() {
  const { fileTextContent, deleteFile } = useFiles();

  function getWebsitesArrayFromText() {
    console.log('getWebsitesArrayFromText');
    if (
      !fileTextContent ||
      !fileTextContent.includes('\n') ||
      !fileTextContent.includes('http')
    ) {
      const stored = localStorage.getItem('opt::websites');
      if (stored) {
        return JSON.parse(stored) as string[];
      }
      handleFileDelete();
      return [];
    }

    const websitesArray = fileTextContent.split('\n');
    chrome.storage.sync.set({ websites: websitesArray }, function () {
      console.log('Value is set to ' + websitesArray);
    });

    return websitesArray;
  }

  const getFromStorage = () => {
    return chrome.storage.sync.get(['websites'], function (result) {
      if (result.websites) {
        localStorage.setItem('opt::websites', JSON.stringify(result.websites));
        return result.websites;
      }
    });
  };

  useEffect(() => getFromStorage(), []);

  const handleFileDelete = () => {
    localStorage.removeItem('opt::websites');
    deleteFile();
  };

  const websites = getWebsitesArrayFromText();

  return websites.length ? (
    <>
      {websites.map((website) => (
        <React.Fragment key={website}>
          <a target="_blank" href={website} rel="noreferrer">
            {website}
          </a>
          <br />
        </React.Fragment>
      ))}
      <button onClick={handleFileDelete}> delete</button>{' '}
    </>
  ) : (
    <Upload />
  );
}
