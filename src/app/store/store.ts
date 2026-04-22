import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import {Auth} from "../../features/auth";
import {Register} from "../../features/register";
import { rootSaga } from "./rootSaga";
import { eventsReducer } from "../../features/events/Slice"
import { heroReducer } from "../../features/hero/Slice";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: {
        ...Auth.reducer,
        ...Register.reducer,
        events: eventsReducer,
        hero: heroReducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;