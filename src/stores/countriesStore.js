import { defineStore } from 'pinia';
import ApiAxios from '../../api/Api.js';
import Cookies from 'js-cookie';

export const useCountriesStore = defineStore('countries', {
  state: () => ({
    countries: [],
    isLoading: false,
    error: null,
    selectedCountryId: null,
    selectedCityId: null,
  }),
  actions: {
    async fetchCountries() {
      this.isLoading = true;
      this.error = null;
      try {
        const token = Cookies.get('token');
        const response = await ApiAxios.index(
          '/countries',
          `Bearer ${token}`
        );
        // Response shape: { data: [ { id, name, cities: [ { id, name, areas: [...] } ] } ] }
        this.countries = response.data.data || response.data;
      } catch (error) {
        this.error = error.response?.data?.message || error.message;
        this.countries = [];
      } finally {
        this.isLoading = false;
      }
    },
    setSelectedCountry(countryId) {
      this.selectedCountryId = countryId;
      this.selectedCityId = null;
    },
    setSelectedCity(cityId) {
      this.selectedCityId = cityId;
    },
    getCitiesByCountry(countryId) {
      const country = this.countries.find(c => c.id === countryId);
      return country ? country.cities : [];
    },
    getAreasByCity(countryId, cityId) {
      const cities = this.getCitiesByCountry(countryId);
      const city = cities.find(c => c.id === cityId);
      return city ? city.areas : [];
    }
  },
  getters: {
    getCountries: (state) => state.countries,
    getLoading: (state) => state.isLoading,
    getError: (state) => state.error,
    getSelectedCountry: (state) => state.selectedCountryId,
    getSelectedCity: (state) => state.selectedCityId,
    getCities: (state) => {
      if (!state.selectedCountryId) return [];
      const country = state.countries.find(c => c.id === state.selectedCountryId);
      return country ? country.cities : [];
    },
    getAreas: (state) => {
      if (!state.selectedCountryId || !state.selectedCityId) return [];
      const country = state.countries.find(c => c.id === state.selectedCountryId);
      if (!country) return [];
      const city = country.cities.find(c => c.id === state.selectedCityId);
      return city ? city.areas : [];
    }
  }
});
