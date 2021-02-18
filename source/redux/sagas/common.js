import { takeEvery, call, put } from "redux-saga/effects";
import _ from "lodash";

import CommonActions from "../constants/action-types/common";

function* handleApiCall(action) {
  const { promise, onSuccessCallback, placeholderData } = action;
  const { START, SUCCESS, FAIL } = action.subtypes;

  yield put({ type: START, data: action.data });

  try {
    const response = yield call(promise);
    const result = yield response.data;
    yield put({
      type: SUCCESS,
      payload: placeholderData || result,
      data: action.data,
    });

    if (onSuccessCallback && _.isFunction(onSuccessCallback)) {
      yield call(onSuccessCallback);
    }
  } catch (errors) {
    yield put({ type: FAIL, errors, data: action.data });
  }
}

export default function* () {
  yield takeEvery(CommonActions.COMMON_API_CALL, handleApiCall);
}
