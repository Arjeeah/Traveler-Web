import { defineStore } from 'pinia';
import ApiAxios from '../../api/Api.js';
import Cookies from 'js-cookie';

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [],
    isLoading: false,
    error: null,
    currentTask: null,
  }),
  actions: {
    async fetchTasks(tripId) {
      this.isLoading = true;
      this.error = null;
      try {
        const token = Cookies.get('token');
        const response = await ApiAxios.index(
          `/trips/${tripId}/tasks`,
          `Bearer ${token}`
        );
        this.tasks = response.data.data || response.data;
      } catch (error) {
        this.error = error.response?.data?.message || error.message;
        this.tasks = [];
      } finally {
        this.isLoading = false;
      }
    },
    async createTask(tripId, taskData) {
      this.isLoading = true;
      this.error = null;
      try {
        const token = Cookies.get('token');
        const response = await ApiAxios.store(
          `/trips/${tripId}/tasks`,
          taskData,
          `Bearer ${token}`
        );
        this.currentTask = response.data.data;
        // Optionally push to tasks or refetch
        return response.data.data;
      } catch (error) {
        this.error = error.response?.data?.message || error.message;
        throw error;
      } finally {
        this.isLoading = false;
      }
    },
    async updateTask(taskId, taskData) {
      this.isLoading = true;
      this.error = null;
      try {
        const token = Cookies.get('token');
        const response = await ApiAxios.update(
          taskId,
          '/tasks',
          null,
          taskData,
          `Bearer ${token}`
        );
        this.currentTask = response.data.data;
        return response.data.data;
      } catch (error) {
        this.error = error.response?.data?.message || error.message;
        throw error;
      } finally {
        this.isLoading = false;
      }
    },
    async deleteTask(taskId) {
      this.isLoading = true;
      this.error = null;
      try {
        const token = Cookies.get('token');
        await ApiAxios.delete(
          taskId,
          '/tasks',
          `Bearer ${token}`
        );
        // Optionally remove from tasks array
        this.tasks = this.tasks.filter(t => t.id !== taskId);
      } catch (error) {
        this.error = error.response?.data?.message || error.message;
        throw error;
      } finally {
        this.isLoading = false;
      }
    }
  },
  getters: {
    getTasks: (state) => state.tasks,
    getLoading: (state) => state.isLoading,
    getError: (state) => state.error,
    getCurrentTask: (state) => state.currentTask,
  }
});
