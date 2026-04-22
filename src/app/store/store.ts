import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import {Auth} from "../../features/auth";
import { rootSaga } from "./rootSaga";
import eventsReducer from "../../features/events/eventsSlice"
import heroReducer from "../../features/hero/heroSlice";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: {
        ...Auth.reducer,
        events: eventsReducer,
        hero: heroReducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;