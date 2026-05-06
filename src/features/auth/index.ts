import { actions, reducer, name } from "./model/Slice";
import { authSaga } from "./model/Saga";
import { selectors } from "./model/selectors";

export const AuthFeature = {
    actions,
    authSaga,
    selectors,
    reducer: { [name]: reducer },
};

export { actions, authSaga, name, selectors };
