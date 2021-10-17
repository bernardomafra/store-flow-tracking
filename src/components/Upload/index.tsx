import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useFiles } from '../../context/files';

import { DropContainer, UploadMessage } from './styles';

function Upload() {
  const { handleUpload } = useFiles();

  const onDrop = useCallback(
    (files) => {
      handleUpload(files);
    },
    [handleUpload],
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      accept: 'text/plain',
      onDrop,
    });

  const renderDragMessage = useCallback(() => {
    if (!isDragActive) {
      return <UploadMessage>Arraste o arquivo aqui</UploadMessage>;
    }

    if (isDragReject) {
      return (
        <UploadMessage type="error">
          Tipo de arquivo não suportado
        </UploadMessage>
      );
    }

    return <UploadMessage type="success">Solte o arquivo aqui</UploadMessage>;
  }, [isDragActive, isDragReject]);

  return (
    <DropContainer {...getRootProps()}>
      <input {...getInputProps()} />
      {renderDragMessage()}
    </DropContainer>
  );
}

export default Upload;
