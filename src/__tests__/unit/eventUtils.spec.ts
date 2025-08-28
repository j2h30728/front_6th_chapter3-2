import { Event } from '../../types';
import { groupRepeatingEvents } from '../../utils/eventUtils';

describe('groupRepeatingEvents >', () => {
  const createMockEvent = (overrides: Partial<Event> = {}): Event => ({
    id: '1',
    title: '테스트 일정',
    date: '2025-10-01',
    startTime: '09:00',
    endTime: '10:00',
    description: '테스트 설명',
    location: '테스트 장소',
    category: '업무',
    repeat: { type: 'none', interval: 0 },
    notificationTime: 10,
    ...overrides,
  });

  describe('반복 일정 그룹화', () => {
    it('같은 제목과 반복 설정을 가진 반복 일정들을 그룹화한다', () => {
      const events: Event[] = [
        createMockEvent({
          id: '1',
          title: '주간 스탠드업',
          date: '2025-10-02',
          repeat: { type: 'weekly', interval: 1, endDate: '2025-10-30' },
        }),
        createMockEvent({
          id: '2',
          title: '주간 스탠드업',
          date: '2025-10-09',
          repeat: { type: 'weekly', interval: 1, endDate: '2025-10-30' },
        }),
        createMockEvent({
          id: '3',
          title: '주간 스탠드업',
          date: '2025-10-16',
          repeat: { type: 'weekly', interval: 1, endDate: '2025-10-30' },
        }),
      ];

      const result = groupRepeatingEvents(events);

      // 하나의 그룹이 생성되어야 함
      expect(Object.keys(result)).toHaveLength(1);

      // 해당 그룹에 3개의 이벤트가 포함되어야 함
      const groupKey = Object.keys(result)[0];
      expect(result[groupKey]).toHaveLength(3);
      expect(result[groupKey][0].title).toBe('주간 스탠드업');
      expect(result[groupKey][1].title).toBe('주간 스탠드업');
      expect(result[groupKey][2].title).toBe('주간 스탠드업');
    });
  });
});
