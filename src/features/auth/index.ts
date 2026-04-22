// export { default as authReducer } from "./model/authSlice";
// export { authSaga } from "./model/authSaga";
// export * from "./model/authSlice";
// export * from "./model/authTypes"

import { actions, name, reducer } from "./model/authSlice";
import { authSaga } from "./model/authSaga";

export const init = authSaga;

export const Auth = {
    actions,
    reducer: {
        [name]: reducer
    },
    selectors: {}
}