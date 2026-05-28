import { eventsSaga } from "./model/Saga";
import { selectors } from "./model/selectors";
import {
    eventsReducer,
    fetchEventsRequest,
    fetchEventsSuccess,
    fetchEventsFailure,
    fetchEventByIdRequest,
    fetchEventByIdSuccess,
    fetchEventByIdFailure,
} from "./model/Slice";

export { eventsSaga, eventsReducer, selectors };
export {
    fetchEventsRequest,
    fetchEventsSuccess,
    fetchEventsFailure,
    fetchEventByIdRequest,
    fetchEventByIdSuccess,
    fetchEventByIdFailure,
};
