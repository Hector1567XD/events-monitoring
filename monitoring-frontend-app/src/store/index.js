import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

// Reducer root
import rootReducer from './reducer'

// Creamos una store con un potenciador que habilita las devtools y habilita los middlewares Thunk
const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))
const store = createStore(rootReducer, composedEnhancer)

export default store
