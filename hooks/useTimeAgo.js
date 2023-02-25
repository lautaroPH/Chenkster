import { useEffect, useState } from 'react';
import { formatDate } from './useDateTimeFormat';

const isRelativeTimeFormatSupported =
  typeof Intl !== 'undefined' && Intl.RelativeTimeFormat;

const DATE_UNITS = [
  ['day', 86400],
  ['hour', 3600],
  ['minute', 60],
  ['second', 1],
];

const getDateDiffs = (timestamp) => {
  const now = Date.now();
  const elapsed = timestamp ? (timestamp - now) / 1000 : -3.59;

  for (const [unit, secondsInUnit] of DATE_UNITS) {
    if (Math.abs(elapsed) > secondsInUnit || unit === 'second') {
      const value = Math.round(elapsed / secondsInUnit);
      return { value, unit };
    }
  }
};

export function useTimeAgo(timestamp) {
  const [timeago, setTimeago] = useState(() => getDateDiffs(timestamp));

  useEffect(() => {
    let intervalId;

    if (isRelativeTimeFormatSupported) {
      const updateInterval = () => {
        const newTimeAgo = getDateDiffs(timestamp);
        setTimeago(newTimeAgo);
      };

      updateInterval();

      intervalId = setInterval(updateInterval, 5 * 60 * 1000); // 5 minutos en milisegundos
    }

    return () => clearInterval(intervalId);
  }, [timestamp]);

  if (!isRelativeTimeFormatSupported) {
    return formatDate(timestamp);
  }

  const rtf = new Intl.RelativeTimeFormat('en', { style: 'long' });

  let { value, unit } = timeago;
  if (value === 0) {
    value = -1;
  }

  return rtf.format(value, unit);
}
