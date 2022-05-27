import React, { createContext, useState, useEffect, useContext } from "react";

export interface IFile {
  name: string;
  preview: string;
  file: File | null;
  url: string;
}

interface IFileContextData {
  uploadedFile: IFile | null;
  deleteFile(): void;
  handleUpload(file: any): void;
  fileTextContent: string;
  setFileTextContent(text: string): void;
}

const FileContext = createContext<IFileContextData>({} as IFileContextData);

const FileProvider: React.FC = ({ children }) => {
  const [uploadedFile, setUploadedFile] = useState<IFile | null>(null);
  const [text, setText] = useState<string>("");

  console.log("FileProvider::rendered");
  useEffect(() => {
    return () => {
      uploadedFile && URL.revokeObjectURL(uploadedFile.preview);
    };
  });

  const handleUpload = async (files: File[]) => {
    const file = files[0];

    if (!file) return;

    const newUploadedFile: IFile = {
      file,
      name: file.name,
      preview: URL.createObjectURL(file),
      url: "",
    };

    // concat é mais performático que ...spread
    // https://www.malgol.com/how-to-merge-two-arrays-in-javascript/
    setUploadedFile(newUploadedFile);

    try {
      const fileData = await fetch(newUploadedFile.preview);
      console.log(fileData);
      const fileText = await fileData.text();
      setText(fileText);
    } catch {
      setText("");
    }
  };

  const deleteFile = () => {
    setUploadedFile(null);
    setText("");
  };

  return (
    <FileContext.Provider
      value={{
        uploadedFile: uploadedFile,
        deleteFile,
        handleUpload,
        fileTextContent: text,
        setFileTextContent: setText,
      }}
    >
      {children}
    </FileContext.Provider>
  );
};

function useFiles(): IFileContextData {
  const context = useContext(FileContext);

  if (!context) {
    throw new Error("useFiles must be used within FileProvider");
  }

  return context;
}

export { FileProvider, useFiles };
