import { createStore } from "vuex";
import { IWeatherLocation } from "@/services/api/types/model";
import fetchPrepareDataService from "@/services/fetch-prepare-data";
import { changeElemArray, getElOfArray } from "@/helpers/array";
import {
  ADD_CITY_DATA,
  ADD_DATA,
  CHANGE_LOCATIONS,
  DELETE_LOCATION,
  SET_ID,
} from "@/store/mutations";
import {
  ADD_CITY,
  CHANGE_ORDER_LOCATIONS,
  DELETE_ITEM,
  GET_LOCATIONS,
  SET_PREVIOUS_ID,
} from "@/store/actions";

export interface IState {
  data: IWeatherLocation[];
  previousId: null | string;
}

export default createStore<IState>({
  state: {
    data: [],
    previousId: null,
  },
  getters: {},
  mutations: {
    [ADD_CITY_DATA](state, value) {
      state.data = [...state.data, value];
    },

    [ADD_DATA](state, data) {
      state.data = data;
    },

    [CHANGE_LOCATIONS](state: IState, currentId: string) {
      const previousIdEl = getElOfArray(
        state.data,
        state.previousId!
      ) as IWeatherLocation;
      const currentIdEl = getElOfArray(
        state.data,
        currentId
      ) as IWeatherLocation;
      state.data = changeElemArray(
        state.data,
        currentId,
        state.previousId!,
        currentIdEl,
        previousIdEl
      );
      fetchPrepareDataService.prepareSetDataToStorage(state.data);
    },

    [SET_ID](state, id: string) {
      state.previousId = id;
    },

    [DELETE_LOCATION](state, name: string) {
      state.data = [...state.data].filter((el) => el.location !== name);
      fetchPrepareDataService.prepareSetDataToStorage(state.data);
    },
  },
  actions: {
    async [GET_LOCATIONS]({ commit }) {
      try {
        const data = await fetchPrepareDataService.getWeather();
        if (data) {
          commit(ADD_DATA, data);
        }
      } catch (e) {
        console.log(e);
      }
    },

    async [ADD_CITY]({ commit }, city: string) {
      try {
        const data = await fetchPrepareDataService.addCity(city, true);
        if (data) {
          commit(ADD_CITY_DATA, data);
        }
      } catch (e) {
        console.log(e);
      }
    },

    [CHANGE_ORDER_LOCATIONS]({ commit }, index: number) {
      commit(CHANGE_LOCATIONS, index);
    },

    [SET_PREVIOUS_ID]({ commit }, id: string) {
      commit(SET_ID, id);
    },

    [DELETE_ITEM]({ commit }, name: string) {
      commit(DELETE_LOCATION, name);
    },
  },
  modules: {},
});
