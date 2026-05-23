import { create } from 'zustand';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { persist, createJSONStorage } from 'zustand/middleware';

import {
  addTask as apiAddTask,
  deleteTask as apiDeleteTask,
  getAllTasks,
  updateTask as apiUpdateTask,
  TaskItem,
} from '../utils/handle-api';

interface TaskStore {
  tasks: TaskItem[];

  loading: boolean;

  fetchTasks: () => void;

  addTask: (
    text: string,
    completed: boolean,
    dueDate: string | null,
    onSuccess: () => void
  ) => void;

  updateTask: (
    id: string,
    text: string,
    completed: boolean,
    dueDate: string | null,
    onSuccess: () => void
  ) => void;

  deleteTask: (id: string) => void;

  clearTasks: () => void;
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: [],

      loading: false,

      fetchTasks: () => {
        set({ loading: true });

        getAllTasks(
          (value) => {
            const tasks =
              typeof value === 'function'
                ? value([])
                : value;

            set({ tasks });
          },

          (value) => {
            const loading =
              typeof value === 'function'
                ? value(false)
                : value;

            set({ loading });
          }
        );
      },

      addTask: (
        text,
        completed,
        dueDate,
        onSuccess
      ) => {
        apiAddTask(
          text,
          completed,
          dueDate,

          (value) => {
            const tasks =
              typeof value === 'function'
                ? value([])
                : value;

            set({ tasks });
          },

          onSuccess
        );
      },

      updateTask: (
        id,
        text,
        completed,
        dueDate,
        onSuccess
      ) => {
        apiUpdateTask(
          id,
          text,
          completed,
          dueDate,

          (value) => {
            const tasks =
              typeof value === 'function'
                ? value([])
                : value;

            set({ tasks });
          },

          onSuccess
        );
      },

      deleteTask: (id) => {
        apiDeleteTask(
          id,

          (value) => {
            const tasks =
              typeof value === 'function'
                ? value([])
                : value;

            set({ tasks });
          }
        );
      },

      clearTasks: () => {
        set({ tasks: [] });
      },
    }),

    {
      name: 'tasks-storage',

      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);