import { eventsSaga } from "./model/Saga";
import {
    eventsReducer,
    fetchEventsRequest,
    fetchEventsSuccess,
    fetchEventsFailure,
    fetchEventByIdRequest,
    fetchEventByIdSuccess,
    fetchEventByIdFailure,
} from "./model/Slice";

export { eventsSaga, eventsReducer };
export {
    fetchEventsRequest,
    fetchEventsSuccess,
    fetchEventsFailure,
    fetchEventByIdRequest,
    fetchEventByIdSuccess,
    fetchEventByIdFailure,
};
