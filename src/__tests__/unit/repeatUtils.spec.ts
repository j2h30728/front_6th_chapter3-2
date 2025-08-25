import { Event } from '../../types';
import { generateRecurringDates } from '../../utils/repeatUtils';

describe('generateRecurringDates >', () => {
  it('repeat.type이 "none"일 때, 날짜 배열에 원본 이벤트 날짜만 포함한다.', () => {
    const event: Event = {
      id: '1',
      date: '2025-08-01',
      startTime: '14:00',
      endTime: '16:00',
      title: '이벤트 1',
      description: '',
      location: '',
      category: '',
      repeat: { type: 'none', interval: 1 },
      notificationTime: 0,
    };

    const result = generateRecurringDates(event);
    expect(result).toEqual([event.date]);
    expect(result).toHaveLength(1);
  });
});
