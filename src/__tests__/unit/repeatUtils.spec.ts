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

  it('repeat.type이 "daily"이면 시작일부터 종료일까지 매일 날짜를 생성한다', () => {
    const event: Event = {
      id: '1',
      date: '2025-08-01',
      startTime: '14:00',
      endTime: '16:00',
      title: '이벤트 1',
      description: '',
      location: '',
      category: '',
      repeat: { type: 'daily', interval: 1, endDate: '2025-08-05' },
      notificationTime: 0,
    };

    const result = generateRecurringDates(event);
    expect(result).toEqual(['2025-08-01', '2025-08-02', '2025-08-03', '2025-08-04', '2025-08-05']);
    expect(result).toHaveLength(5);
  });

  it('repeat.type이 "weekly"이면 시작일부터 종료일까지 매주 날짜를 생성한다', () => {
    const event: Event = {
      id: '1',
      date: '2025-08-01',
      startTime: '14:00',
      endTime: '16:00',
      title: '이벤트 1',
      description: '',
      location: '',
      category: '',
      repeat: { type: 'weekly', interval: 1, endDate: '2025-08-22' },
      notificationTime: 0,
    };

    const result = generateRecurringDates(event);
    expect(result).toEqual(['2025-08-01', '2025-08-08', '2025-08-15', '2025-08-22']);
    expect(result).toHaveLength(4);
  });

  it('repeat.type이 "monthly"이면 시작일부터 종료일까지 매달 날짜를 생성한다.', () => {
    const event: Event = {
      id: '1',
      date: '2025-08-01',
      startTime: '14:00',
      endTime: '16:00',
      title: '이벤트 1',
      description: '',
      location: '',
      category: '',
      repeat: { type: 'monthly', interval: 1, endDate: '2025-10-05' },
      notificationTime: 0,
    };

    const result = generateRecurringDates(event);
    expect(result).toEqual(['2025-08-01', '2025-09-01', '2025-10-01']);
    expect(result).toHaveLength(3);
  });

  it('repeat.type이 "yearly"이면 시작일부터 종료일까지 매년 날짜를 생성한다.', () => {
    const event: Event = {
      id: '1',
      date: '2025-08-01',
      startTime: '14:00',
      endTime: '16:00',
      title: '이벤트 1',
      description: '',
      location: '',
      category: '',
      repeat: { type: 'yearly', interval: 1, endDate: '2027-08-01' },
      notificationTime: 0,
    };

    const result = generateRecurringDates(event);
    expect(result).toEqual(['2025-08-01', '2026-08-01', '2027-08-01']);
    expect(result).toHaveLength(3);
  });

  it('repeat.type이 "daily"이고 interval이 5일 때, 시작일부터 종료일까지 5일 간격으로 날짜를 생성한다.', () => {
    const event: Event = {
      id: '1',
      date: '2025-08-01',
      startTime: '14:00',
      endTime: '16:00',
      title: '이벤트 1',
      description: '',
      location: '',
      category: '',
      repeat: { type: 'daily', interval: 5, endDate: '2025-09-01' },
      notificationTime: 0,
    };

    const result = generateRecurringDates(event);
    expect(result).toEqual([
      '2025-08-01',
      '2025-08-06',
      '2025-08-11',
      '2025-08-16',
      '2025-08-21',
      '2025-08-26',
      '2025-08-31',
    ]);
    expect(result).toHaveLength(7);
  });

  it('repeat.type이 "weekly"이고 interval이 2일 때, 시작일부터 종료일까지 2주 간격으로 날짜를 생성한다.', () => {
    const event: Event = {
      id: '1',
      date: '2025-08-01',
      startTime: '14:00',
      endTime: '16:00',
      title: '이벤트 1',
      description: '',
      location: '',
      category: '',
      repeat: { type: 'weekly', interval: 2, endDate: '2025-09-10' },
      notificationTime: 0,
    };

    const result = generateRecurringDates(event);
    expect(result).toEqual(['2025-08-01', '2025-08-15', '2025-08-29']);
    expect(result).toHaveLength(3);
  });

  it('repeat.type이 "monthly"이고 interval이 2일 때, 시작일부터 종료일까지 2개월 간격으로 날짜를 생성한다.', () => {
    const event: Event = {
      id: '1',
      date: '2025-08-01',
      startTime: '14:00',
      endTime: '16:00',
      title: '이벤트 1',
      description: '',
      location: '',
      category: '',
      repeat: { type: 'monthly', interval: 2, endDate: '2025-12-01' },
      notificationTime: 0,
    };

    const result = generateRecurringDates(event);
    expect(result).toEqual(['2025-08-01', '2025-10-01', '2025-12-01']);
    expect(result).toHaveLength(3);
  });

  it('repeat.type이 "yearly"이고 interval이 2일 때, 시작일부터 종료일까지 2년 간격으로 날짜를 생성한다.', () => {
    const event: Event = {
      id: '1',
      date: '2025-08-01',
      startTime: '14:00',
      endTime: '16:00',
      title: '이벤트 1',
      description: '',
      location: '',
      category: '',
      repeat: { type: 'yearly', interval: 2, endDate: '2027-08-01' },
      notificationTime: 0,
    };

    const result = generateRecurringDates(event);
    expect(result).toEqual(['2025-08-01', '2027-08-01']);
    expect(result).toHaveLength(2);
  });
});
