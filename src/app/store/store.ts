import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { AuthFeature } from "../../features/auth";
import { eventsReducer } from "../../features/events";
import { heroReducer } from "../../features/hero/model/Slice";
import { NavigationFeature } from "../../features/navigation";
import { registerReducer } from "../../features/register";
import { rootSaga } from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: {
        ...AuthFeature.reducer,
        ...NavigationFeature.reducer,
        register: registerReducer,
        events: eventsReducer,
        hero: heroReducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);



