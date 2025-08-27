import { Event } from '../types';
import { formatDate } from './dateUtils';

const ONE_DAY = 60 * 60 * 24 * 1000;
const ONE_WEEK = 60 * 60 * 24 * 7 * 1000;

export function generateRecurringDates(event: Event) {
  const repeatType = event.repeat.type;
  const startData = event.date;

  if (repeatType === 'none') {
    return [startData];
  }

  if (repeatType === 'daily') {
    const endDate = event.repeat.endDate || '2025-10-30';
    const interval = event.repeat.interval || 1;
    const endDateTime = new Date(endDate).getTime();
    const startDateTime = new Date(event.date).getTime();

    const dateArr = [];
    let temp = startDateTime;
    while (temp <= endDateTime) {
      dateArr.push(formatDate(new Date(temp)));
      temp += ONE_DAY * interval;
    }
    return dateArr;
  }

  if (repeatType === 'weekly') {
    const endDate = event.repeat.endDate || '2025-10-30';
    const endDateTime = new Date(endDate).getTime();
    const startDateTime = new Date(event.date).getTime();

    const dateArr = [];
    let temp = startDateTime;
    while (temp <= endDateTime) {
      dateArr.push(formatDate(new Date(temp)));
      temp += ONE_WEEK;
    }
    return dateArr;
  }

  if (repeatType === 'monthly') {
    const endDate = event.repeat.endDate || '2025-10-30';
    const endDateTime = new Date(endDate).getTime();

    const dateArr = [];
    let currentDate = new Date(event.date);

    while (currentDate.getTime() <= endDateTime) {
      dateArr.push(formatDate(currentDate));

      const nextMonth = new Date(currentDate);
      nextMonth.setMonth(nextMonth.getMonth() + 1);

      currentDate = nextMonth;
    }
    return dateArr;
  }

  if (repeatType === 'yearly') {
    const endDate = event.repeat.endDate || '2025-10-30';
    const endDateTime = new Date(endDate).getTime();

    const dateArr = [];
    let currentDate = new Date(event.date);

    while (currentDate.getTime() <= endDateTime) {
      dateArr.push(formatDate(currentDate));

      const nextYear = new Date(currentDate);
      nextYear.setFullYear(nextYear.getFullYear() + 1);

      currentDate = nextYear;
    }
    return dateArr;
  }

  return event;
}
