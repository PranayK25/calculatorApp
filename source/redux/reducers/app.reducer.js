import appActions from "../constants/action-types/app.actionTypes";
import persistWraper from "./persistWraper";
import _ from "lodash";

const initialState = {};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const blackList = _.without(
  Object.keys(initialState)
  // Persist all the keys listed below
);

export default persistWraper(AppReducer, blackList, "App");
