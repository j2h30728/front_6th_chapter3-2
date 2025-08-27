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
    const interval = event.repeat.interval || 1;
    const endDateTime = new Date(endDate).getTime();
    const startDateTime = new Date(event.date).getTime();

    const dateArr = [];
    let temp = startDateTime;
    while (temp <= endDateTime) {
      dateArr.push(formatDate(new Date(temp)));
      temp += ONE_WEEK * interval;
    }
    return dateArr;
  }

  if (repeatType === 'monthly') {
    const endDate = event.repeat.endDate || '2025-10-30';
    const interval = event.repeat.interval || 1;
    const endDateTime = new Date(endDate).getTime();

    const dateArr = [];
    let currentDate = new Date(event.date);

    while (currentDate.getTime() <= endDateTime) {
      dateArr.push(formatDate(currentDate));

      const nextMonth = new Date(currentDate);
      nextMonth.setMonth(nextMonth.getMonth() + interval);

      currentDate = nextMonth;
    }
    return dateArr;
  }

  if (repeatType === 'yearly') {
    const endDate = event.repeat.endDate || '2025-10-30';
    const interval = event.repeat.interval || 1;
    const endDateTime = new Date(endDate).getTime();

    const dateArr = [];
    let currentDate = new Date(event.date);
    const originalMonth = currentDate.getMonth();
    const originalDate = currentDate.getDate();

    while (currentDate.getTime() <= endDateTime) {
      if (currentDate.getMonth() === originalMonth && currentDate.getDate() === originalDate) {
        dateArr.push(formatDate(currentDate));
      }

      const nextYear = new Date(currentDate);
      nextYear.setFullYear(nextYear.getFullYear() + interval);

      if (nextYear.getMonth() !== originalMonth || nextYear.getDate() !== originalDate) {
        nextYear.setFullYear(nextYear.getFullYear() + interval);
        nextYear.setMonth(originalMonth);
        nextYear.setDate(originalDate);
      }

      currentDate = nextYear;
    }
    return dateArr;
  }

  return event;
}
