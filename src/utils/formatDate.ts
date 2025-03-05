const formatDate = (isoString: string) => {
  const trimmedIsoString = isoString.split('.')[0];
  const date = new Date(trimmedIsoString);
  return date
    .toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .replace(/\./g, '.');
};
export default formatDate;
