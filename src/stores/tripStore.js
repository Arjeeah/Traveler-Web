import { defineStore } from 'pinia';
import ApiAxios from '../../api/Api.js';
import Cookies from 'js-cookie';

export const useTripStore = defineStore('trip', {
  state: () => ({
    trips: [],
    isLoading: false,
    error: null,
    currentTrip: null,
    paginationMeta: null,
    currentTripAreas: [],
  }),
  actions: {
    async fetchTrips(params = {}) {
      this.isLoading = true;
      this.error = null;
      try {
        const token = Cookies.get('token');
        const response = await ApiAxios.index(
          '/trips',
          `Bearer ${token}`,
          params
        );
        this.trips = response.data.data || response.data;
        this.paginationMeta = response.data.meta || null;
      } catch (error) {
        this.error = error.response?.data?.message || error.message;
        this.trips = [];
      } finally {
        this.isLoading = false;
      }
    },
    async fetchTripById(tripId) {
      this.isLoading = true;
      this.error = null;
      try {
        const token = Cookies.get('token');
        const response = await ApiAxios.show(
          tripId,
          '/trips',
          `Bearer ${token}`
        );
        this.currentTrip = response.data.data;
      } catch (error) {
        this.error = error.response?.data?.message || error.message;
        this.currentTrip = null;
      } finally {
        this.isLoading = false;
      }
    },
    async createTrip(tripData) {
      this.isLoading = true;
      this.error = null;
      try {
        const token = Cookies.get('token');
        const response = await ApiAxios.store(
          '/trips',
          tripData,
          `Bearer ${token}`
        );
        // Optionally push to trips or refetch
        this.currentTrip = response.data.data;
        return response.data.data;
      } catch (error) {
        this.error = error.response?.data?.message || error.message;
        throw error;
      } finally {
        this.isLoading = false;
      }
    },
    async updateTrip(tripId, tripData) {
      this.isLoading = true;
      this.error = null;
      try {
        const token = Cookies.get('token');
        const response = await ApiAxios.update(
          tripId,
          '/trips',
          null,
          tripData,
          `Bearer ${token}`
        );
        this.currentTrip = response.data.data;
        return response.data.data;
      } catch (error) {
        this.error = error.response?.data?.message || error.message;
        throw error;
      } finally {
        this.isLoading = false;
      }
    },
    async deleteTrip(tripId) {
      this.isLoading = true;
      this.error = null;
      try {
        const token = Cookies.get('token');
        await ApiAxios.delete(
          tripId,
          '/trips',
          `Bearer ${token}`
        );
        // Optionally remove from trips array
        this.trips = this.trips.filter(t => t.id !== tripId);
      } catch (error) {
        this.error = error.response?.data?.message || error.message;
        throw error;
      } finally {
        this.isLoading = false;
      }
    },
    async fetchTripAreas(tripId) {
      this.isLoading = true;
      this.error = null;
      try {
        const token = Cookies.get('token');
        const response = await ApiAxios.index(
          `/trips/${tripId}/areas`,
          `Bearer ${token}`
        );
        this.currentTripAreas = response.data.data || response.data;
      } catch (error) {
        this.error = error.response?.data?.message || error.message;
        this.currentTripAreas = [];
      } finally {
        this.isLoading = false;
      }
    },
    async addAreaToTrip(tripId, areaId, order = 0) {
      this.isLoading = true;
      this.error = null;
      try {
        const token = Cookies.get('token');
        const response = await ApiAxios.store(
          `/trips/${tripId}/areas`,
          { area_id: areaId, order },
          `Bearer ${token}`
        );
        return response.data.data;
      } catch (error) {
        this.error = error.response?.data?.message || error.message;
        throw error;
      } finally {
        this.isLoading = false;
      }
    },
    async removeAreaFromTrip(tripId, areaId) {
      this.isLoading = true;
      this.error = null;
      try {
        const token = Cookies.get('token');
        await ApiAxios.delete(
          areaId,
          `/trips/${tripId}/areas`,
          `Bearer ${token}`
        );
      } catch (error) {
        this.error = error.response?.data?.message || error.message;
        throw error;
      } finally {
        this.isLoading = false;
      }
    },
    async reorderTripAreas(tripId, areas) {
      this.isLoading = true;
      this.error = null;
      try {
        const token = Cookies.get('token');
        await ApiAxios.update(
          null,
          `/trips/${tripId}/areas/reorder`,
          null,
          { areas },
          `Bearer ${token}`
        );
      } catch (error) {
        this.error = error.response?.data?.message || error.message;
        throw error;
      } finally {
        this.isLoading = false;
      }
    },
  },
  getters: {
    getTrips: (state) => state.trips,
    getLoading: (state) => state.isLoading,
    getError: (state) => state.error,
    getCurrentTrip: (state) => state.currentTrip,
    getPaginationMeta: (state) => state.paginationMeta,
    getCurrentTripAreas: (state) => state.currentTripAreas,
  }
});
