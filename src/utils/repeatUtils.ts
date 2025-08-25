import { Event } from '../types';

export function generateRecurringDates(event: Event) {
  if (event.repeat.type === 'none') {
    return [event.date];
  }
  return event;
}
