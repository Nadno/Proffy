export const secondsToReadableTime = (secondsUTC: number) => {
  const hours = Math.floor((secondsUTC / 60) / 60);
    const minutes = Math.floor((secondsUTC / 60) - hours * 60);
    const seconds = secondsUTC % 60;
    
    const formatNumber = (value: any) => `0${Number.parseInt(value, 10)}`.slice(-2);

    return [hours, minutes, seconds].map(formatNumber).join(':');
};