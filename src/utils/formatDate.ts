const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  return date
    .toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .replace(/-/g, '.');
};
export default formatDate;
