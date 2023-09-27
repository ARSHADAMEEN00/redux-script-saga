import { all, fork } from "redux-saga/effects";
import Osperb5Saga from "osperb5/saga"

import Osperb4Saga from "osperb4/saga"

import Osperb3Saga from "osperb3/saga"

export default function* rootSaga() {
yield all([
fork(Osperb3Saga),
fork(Osperb4Saga),
fork(Osperb4Saga),
 fork(Osperb5Saga),
 ])
}