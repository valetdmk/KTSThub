// export { default as authReducer } from "./model/authSlice";
// export { authSaga } from "./model/authSaga";
// export * from "./model/authSlice";
// export * from "./model/authTypes"

import { actions, name, reducer } from "./model/Slice";
import { authSaga } from "./model/Saga";

export const init = authSaga;

export const Auth = {
    actions,
    reducer: {
        [name]: reducer
    },
    selectors: {}
}