import { types } from "../constants/types";

export const setAccessToken = (data) => (dispatch) => {
  dispatch({
    type: types.SET_ACCESS_TOKEN,
    payload: data
  })
}

export const setRefreshToken = (data) => (dispatch) => {
  dispatch({
    type: types.SET_REFRESH_TOKEN,
    payload: data
  })
}

export const setUserCompData = (data) => (dispatch) => {
  dispatch({
    type: types.SET_USER_COMP_DATA,
    payload: data
  })
}

export const setUsername = (data) => (dispatch) => {
  dispatch({
    type: types.SET_USERNAME,
    payload: data
  })
}