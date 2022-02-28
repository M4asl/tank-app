import axios from "axios";
import {
  TANK_CREATE_FAIL,
  TANK_CREATE_REQUEST,
  TANK_CREATE_RESET,
  TANK_CREATE_SUCCESS,
  TANK_DELETE_FAIL,
  TANK_DELETE_REQUEST,
  TANK_DELETE_SUCCESS,
  TANK_DETAILS_FAIL,
  TANK_DETAILS_REQUEST,
  TANK_DETAILS_SUCCESS,
  TANK_LIST_BY_USER_FAIL,
  TANK_LIST_BY_USER_REQUEST,
  TANK_LIST_BY_USER_SUCCESS,
  TANK_LIST_FAIL,
  TANK_LIST_REQUEST,
  TANK_LIST_SUCCESS,
  TANK_UPDATE_FAIL,
  TANK_UPDATE_REQUEST,
  TANK_UPDATE_RESET,
  TANK_UPDATE_SUCCESS,
} from "../constants/tankConstants";
import { logout } from "./authActions";

export const listTanks = () => async (dispatch, getState) => {
  try {
    dispatch({ type: TANK_LIST_REQUEST });

    const {
      login: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/tanks`, config);

    dispatch({
      type: TANK_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TANK_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listTanksByUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: TANK_LIST_BY_USER_REQUEST });

    const {
      login: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/tanks/by/${id}`, config);

    dispatch({
      type: TANK_LIST_BY_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TANK_LIST_BY_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const tankDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: TANK_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/tanks/${id}`);

    dispatch({
      type: TANK_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TANK_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteTank = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: TANK_DELETE_REQUEST,
    });

    const {
      login: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/tanks/${id}`, config);

    dispatch({
      type: TANK_DELETE_SUCCESS,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: TANK_DELETE_FAIL,
      payload: message,
    });
  }
};

export const createTank =
  (
    sideNumber,
    producer,
    model,
    currentModification,
    quantityAmmunition,
    mileage,
    armorFront,
    armorSide,
    armorBack,
    vintage,
    dateInCountry,
    userId
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: TANK_CREATE_REQUEST,
      });

      const {
        login: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/tanks/${userId}`,
        {
          sideNumber,
          producer,
          model,
          currentModification,
          quantityAmmunition,
          mileage,
          armorFront,
          armorSide,
          armorBack,
          vintage,
          dateInCountry,
        },
        config
      );

      dispatch({
        type: TANK_CREATE_SUCCESS,
        payload: data,
      });
      dispatch({
        type: TANK_CREATE_RESET,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: TANK_CREATE_FAIL,
        payload: message,
      });
    }
  };

export const updateTank =
  (
    sideNumber,
    producer,
    model,
    currentModification,
    quantityAmmunition,
    mileage,
    armorFront,
    armorSide,
    armorBack,
    vintage,
    dateInCountry,
    tankId
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: TANK_UPDATE_REQUEST,
      });

      const {
        login: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/tanks/${tankId}`,
        {
          sideNumber,
          producer,
          model,
          currentModification,
          quantityAmmunition,
          mileage,
          armorFront,
          armorSide,
          armorBack,
          vintage,
          dateInCountry,
        },
        config
      );

      dispatch({
        type: TANK_UPDATE_SUCCESS,
        payload: data,
      });
      dispatch({ type: TANK_DETAILS_SUCCESS, payload: data });
      dispatch({ type: TANK_UPDATE_RESET });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: TANK_UPDATE_FAIL,
        payload: message,
      });
    }
  };
