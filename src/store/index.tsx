import { configureStore,combineReducers  } from '@reduxjs/toolkit'
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
import  datetimesReducer  from './reducers/DatetimeSlices'
import  collectionsReducer  from './reducers/CollectionSlices'
import  usersReducer  from './reducers/UserSlices'
import daytimesReducer from './reducers/DaytimeSlices'
// import { getDefaultMiddleware } from '@reduxjs/toolkit';
// store

// const persistConfig = {
//   key: 'root', 
//   storage,
//   blacklist: ['meta'],
// };

const rootReducer = combineReducers({
    datetimes: datetimesReducer,
    // collections: persistReducer(persistConfig, collectionsReducer),
    collections: collectionsReducer,
    users: usersReducer,
    daytimes: daytimesReducer,
});



const store = configureStore({
    reducer: rootReducer,
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    //   serializableCheck: false
    // }),
});



// export const persistor = persistStore(store);

export default store