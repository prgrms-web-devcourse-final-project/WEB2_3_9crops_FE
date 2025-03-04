export const timeFormatter = (time: number) => {
  const hr = Math.floor((time / (60 * 60)) % 24);
  const min = Math.floor((time / 60) % 60);
  const sec = Math.floor(time % 60);

  if (hr + min + sec < 0) return { hours: 0, minutes: 0, seconds: 0 };

  return { hours: hr, minutes: min, seconds: sec };
};
