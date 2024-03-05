"use client";
import React from "react";
// import store, {persistor } from '../store'
import store from '../store'
// import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux'
import StateContextProvider from "./contexts/StateContext";


export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  


  return (     
        <Provider store={store}>
          <StateContextProvider>     
            {children}
          </StateContextProvider>
         {/* <PersistGate persistor={persistor}>
            {children}
          </PersistGate>*/}
        </Provider>
  )
}