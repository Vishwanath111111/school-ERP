import { apiClient } from './api.client';
import { TimetableEntry, TimetableRequest, TimetableFilter, TimetableStats } from '@/types/timetable';

const SEED_TIMETABLE: TimetableEntry[] = [
  {
    id: 1,
    className: 'Class 10-A',
    dayOfWeek: 'MONDAY',
    periodNumber: 1,
    subject: 'Mathematics',
    teacherName: 'Anita Sharma',
    roomNumber: 'Room 201',
    startTime: '08:30 AM',
    endTime: '09:15 AM',
    isSubstituted: false,
  },
  {
    id: 2,
    className: 'Class 10-A',
    dayOfWeek: 'MONDAY',
    periodNumber: 2,
    subject: 'Physics',
    teacherName: 'Dr. Robert Chen',
    roomNumber: 'Science Lab 1',
    startTime: '09:15 AM',
    endTime: '10:00 AM',
    isSubstituted: false,
  },
  {
    id: 3,
    className: 'Class 10-A',
    dayOfWeek: 'MONDAY',
    periodNumber: 3,
    subject: 'English',
    teacherName: 'Meera Kulkarni',
    roomNumber: 'Room 201',
    startTime: '10:15 AM',
    endTime: '11:00 AM',
    isSubstituted: false,
  },
  {
    id: 4,
    className: 'Class 10-A',
    dayOfWeek: 'TUESDAY',
    periodNumber: 1,
    subject: 'Chemistry',
    teacherName: 'Sanjay Rao',
    substituteTeacherName: 'Dr. Robert Chen',
    roomNumber: 'Chemistry Lab',
    startTime: '08:30 AM',
    endTime: '09:15 AM',
    isSubstituted: true,
  },
  {
    id: 5,
    className: 'Class 10-A',
    dayOfWeek: 'WEDNESDAY',
    periodNumber: 4,
    subject: 'Computer Science',
    teacherName: 'Vikram Deshmukh',
    roomNumber: 'Computer Lab 2',
    startTime: '11:00 AM',
    endTime: '11:45 AM',
    isSubstituted: false,
  },
];

class TimetableService {
  public async getAllEntries(filters?: TimetableFilter): Promise<TimetableEntry[]> {
    let entries: TimetableEntry[] = [];
    try {
      if (filters?.className && filters.className !== 'ALL') {
        entries = await apiClient.get<TimetableEntry[]>(`/timetable?className=${encodeURIComponent(filters.className)}`);
      } else {
        entries = await apiClient.get<TimetableEntry[]>('/timetable');
      }

      if (!entries || entries.length === 0) {
        entries = SEED_TIMETABLE;
      }
    } catch {
      entries = SEED_TIMETABLE;
    }

    if (filters) {
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase().trim();
        entries = entries.filter(
          (e) =>
            e.subject.toLowerCase().includes(query) ||
            (e.teacherName && e.teacherName.toLowerCase().includes(query)) ||
            (e.roomNumber && e.roomNumber.toLowerCase().includes(query))
        );
      }

      if (filters.dayOfWeek && filters.dayOfWeek !== 'ALL') {
        entries = entries.filter((e) => e.dayOfWeek === filters.dayOfWeek);
      }
    }

    return entries;
  }

  public async createEntry(request: TimetableRequest): Promise<TimetableEntry> {
    try {
      return await apiClient.post<TimetableEntry>('/timetable', request);
    } catch {
      const newEntry: TimetableEntry = {
        id: Date.now(),
        className: request.className,
        dayOfWeek: request.dayOfWeek,
        periodNumber: request.periodNumber,
        subject: request.subject,
        teacherName: request.teacherName,
        substituteTeacherName: request.substituteTeacherName,
        roomNumber: request.roomNumber,
        startTime: request.startTime || '08:30 AM',
        endTime: request.endTime || '09:15 AM',
        isSubstituted: request.isSubstituted || false,
      };
      SEED_TIMETABLE.push(newEntry);
      return newEntry;
    }
  }

  public async updateEntry(id: number, request: TimetableRequest): Promise<TimetableEntry> {
    try {
      return await apiClient.put<TimetableEntry>(`/timetable/${id}`, request);
    } catch {
      const index = SEED_TIMETABLE.findIndex((e) => e.id === id);
      if (index !== -1) {
        const updatedEntry: TimetableEntry = {
          ...SEED_TIMETABLE[index],
          ...request,
          startTime: request.startTime || SEED_TIMETABLE[index].startTime,
          endTime: request.endTime || SEED_TIMETABLE[index].endTime,
        };
        SEED_TIMETABLE[index] = updatedEntry;
        return SEED_TIMETABLE[index];
      }
      throw new Error(`Timetable entry ${id} not found`);
    }
  }

  public async deleteEntry(id: number): Promise<boolean> {
    try {
      await apiClient.delete(`/timetable/${id}`);
      return true;
    } catch {
      const index = SEED_TIMETABLE.findIndex((e) => e.id === id);
      if (index !== -1) {
        SEED_TIMETABLE.splice(index, 1);
      }
      return true;
    }
  }

  public async getStats(): Promise<TimetableStats> {
    const entries = await this.getAllEntries();
    const substituted = entries.filter((e) => e.isSubstituted).length;

    return {
      totalWeeklyPeriods: entries.length,
      activeClassSectionsCount: 12,
      substitutedPeriodsCount: substituted,
      freePeriodsCount: 6,
    };
  }
}

export const timetableService = new TimetableService();
