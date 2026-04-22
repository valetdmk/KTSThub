import { actions, reducer, name } from "./model/Slice";
import { registerSaga } from "./model/Saga";

export { actions, name, registerSaga };
export const registerReducer = reducer;
export { 
    setStep,
    registerRequest,
    registerSuccess,
    registerFailure,
    updateProfileRequest,
    updateProfileSuccess,
    updateProfileFailure,
    resetRegister,
} from "./model/Slice";