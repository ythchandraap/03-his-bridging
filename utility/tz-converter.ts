import * as dayjs from 'dayjs';

import * as timezone from 'dayjs/plugin/timezone';
import * as utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);

export const timezoneConverter = (date: string, tz: string) => {
  return dayjs(date).tz(tz);
};
