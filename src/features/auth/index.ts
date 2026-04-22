import { actions, reducer, name } from "./model/Slice";
import { authSaga } from "./model/Saga";

export { actions, name, authSaga };
export const authReducer = reducer;