export const chunkBox = (array: Array<React.JSX.Element>, size = 3) => {
  const chunkedArray = [];

  for (let i = 0; i < array.length; i += size) {
    chunkedArray.push(array.slice(i, i + size));
  }

  return chunkedArray;
};
