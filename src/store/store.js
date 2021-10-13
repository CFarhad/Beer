import { configureStore } from "@reduxjs/toolkit";
import reducers from "../reducers";

export default function (){
  return configureStore({
    reducer: reducers,
    devTools:true,
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  })
}