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

export const tankListReducer = (state = { tanks: [] }, action) => {
  switch (action.type) {
    case TANK_LIST_REQUEST:
      return { loading: true, tanks: [] };
    case TANK_LIST_SUCCESS:
      return {
        loading: false,
        tanks: action.payload,
      };
    case TANK_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const tankListByUserReducer = (state = { tanks: [] }, action) => {
  switch (action.type) {
    case TANK_LIST_BY_USER_REQUEST:
      return { loading: true, tanks: [] };
    case TANK_LIST_BY_USER_SUCCESS:
      return {
        loading: false,
        tanks: action.payload,
      };
    case TANK_LIST_BY_USER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const tankDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case TANK_DETAILS_REQUEST:
      return { ...state, loading: true };
    case TANK_DETAILS_SUCCESS:
      return { loading: false, tank: action.payload };
    case TANK_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const tankDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case TANK_DELETE_REQUEST:
      return { loading: true };
    case TANK_DELETE_SUCCESS:
      return { loading: false, success: true };
    case TANK_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const tankCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case TANK_CREATE_REQUEST:
      return { loading: true };
    case TANK_CREATE_SUCCESS:
      return { loading: false, success: true, tank: action.payload };
    case TANK_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case TANK_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const tankUpdateReducer = (state = { tank: {} }, action) => {
  switch (action.type) {
    case TANK_UPDATE_REQUEST:
      return { loading: true };
    case TANK_UPDATE_SUCCESS:
      return { loading: false, success: true, tank: action.payload };
    case TANK_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case TANK_UPDATE_RESET:
      return { tank: {} };
    default:
      return state;
  }
};
