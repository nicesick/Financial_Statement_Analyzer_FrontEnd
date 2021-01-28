import ReactDOM         from 'react-dom'

import { createStore, applyMiddleware }     from 'redux'
import { Provider }                         from 'react-redux'
import logger                               from 'redux-logger'

import RootReducer      from './reducer/RootReducer'
import App              from './App'

const store = createStore(RootReducer, applyMiddleware(logger))

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root')
);