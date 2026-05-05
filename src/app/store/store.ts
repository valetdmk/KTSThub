import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { authReducer } from "../../features/auth";
import { eventsReducer } from "../../features/events";
import { heroReducer } from "../../features/hero/model/Slice";
import { registerReducer } from "../../features/register";
import { rootSaga } from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: {
        auth: authReducer,
        register: registerReducer,
        events: eventsReducer,
        hero: heroReducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
