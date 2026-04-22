import { actions, name, reducer } from "./model/Slice";
import { registerSaga } from "./model/Saga";

export const init = registerSaga;

export const Register = {
    actions,
    reducer: {
        [name]: reducer
    },
    selectors: {}
}