export const isFileTextContentValid = (fileTextContent: string): boolean => {
  return (
    !!fileTextContent &&
    fileTextContent.includes('\n') &&
    fileTextContent.includes('http')
  );
};

export const getFileTextContentArray = (fileTextContent: string) => {
  const NON_SPACE_CHARACTER_REGEX = /\S/;

  return fileTextContent
    .split('\n')
    .filter(
      (text) => text.includes('http') && NON_SPACE_CHARACTER_REGEX.test(text),
    );
};
