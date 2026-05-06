import { actions, reducer, name } from "./model/Slice";
import { registerSaga } from "./model/Saga";
import { selectors } from "./model/selectors";

export { actions, name, registerSaga, selectors };
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
