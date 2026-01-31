
import { Task } from './types';

export const COLORS = {
  primary: '#1D61E7',
  background: '#F8FAFC',
  border: '#E2E8F0',
  textSecondary: '#64748B'
};

export const INITIAL_PROJECTS = [
  { id: '1', name: 'Work', color: '#1D61E7', progress: 40 },
  { id: '2', name: 'Personal', color: '#10B981', progress: 60 },
  { id: '3', name: 'Health', color: '#EF4444', progress: 20 },
];

export const INITIAL_TASKS: Task[] = [
  {
    id: 't1',
    title: 'Breakfast',
    time: '08:00',
    date: new Date().toISOString().split('T')[0],
    completed: true,
    projectId: '2',
    tags: ['Daily'],
    createdAt: Date.now(),
    type: 'task'
  },
  {
    id: 't2',
    title: 'Write One Essay',
    time: '09:00',
    date: new Date().toISOString().split('T')[0],
    completed: false,
    projectId: '1',
    tags: ['Study'],
    createdAt: Date.now(),
    type: 'task'
  },
  {
    id: 't3',
    title: 'Call Center Meetup',
    time: '10:00',
    date: new Date().toISOString().split('T')[0],
    completed: false,
    projectId: '1',
    tags: ['Work'],
    createdAt: Date.now(),
    type: 'task'
  },
  {
    id: 'n1',
    title: 'Remember to buy milk',
    time: '11:30',
    date: new Date().toISOString().split('T')[0],
    completed: false,
    projectId: '2',
    tags: [],
    createdAt: Date.now(),
    type: 'note'
  }
];
