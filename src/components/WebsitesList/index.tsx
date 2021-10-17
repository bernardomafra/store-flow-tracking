import React, { useCallback, useEffect } from 'react';
import { useFiles } from '../../context/files';
import { useChromeSyncStorage } from '../../hooks/useChromeSyncStorage';
import { getFileTextContentArray, isFileTextContentValid } from './utils';

interface WebsitesListProps {
  fallbackComponent: React.ReactElement;
}

export default function WebsitesList(props: WebsitesListProps) {
  const { fileTextContent, deleteFile } = useFiles();
  const [websites, setWebsites] = useChromeSyncStorage<string[]>(
    'websites',
    [],
  );

  const handleFileDelete = useCallback(() => {
    setTimeout(deleteFile, 0);
    setWebsites([]);
  }, [deleteFile, setWebsites]);

  const getWebsitesArrayFromText = () => {
    if (isFileTextContentValid(fileTextContent))
      setWebsites(getFileTextContentArray(fileTextContent));
    else if (!websites) handleFileDelete();
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => getWebsitesArrayFromText(), [fileTextContent]);

  if (!websites?.length)
    return props.fallbackComponent || <i>Nenhum website cadastrado</i>;

  return (
    <>
      {websites.map((website) => (
        <React.Fragment key={website}>
          <a target="_blank" href={website} rel="noreferrer">
            {website}
          </a>
          <br />
        </React.Fragment>
      ))}
      <button onClick={handleFileDelete}>delete</button>
    </>
  );
}
