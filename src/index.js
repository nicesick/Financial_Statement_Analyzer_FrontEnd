import ReactDOM         from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import reduxThunk from 'redux-thunk';

import RootReducer      from './reducer/RootReducer'
import App              from './App'

// const store = createStore(RootReducer, applyMiddleware(logger))
const store = configureStore({
    reducer: RootReducer,
    middleware: [logger, reduxThunk]
});

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root')
);