import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from "redux-thunk"
import formData from './reducers/form'
import Doctors from './reducers/doctor'
import Tests from "./reducers/test"
import Token from "./reducers/token"
import fileUpload from './reducers/fileupload'
import dynamicPatient from "./reducers/dynamicPatient"
import { composeWithDevTools } from "redux-devtools-extension"

const initailState = {}



const middleware = [thunk]
const rootReducer = combineReducers({
    dynamicPatient,
    formData,
    Doctors,
    Tests,
    Token,
    fileUpload
})
const store = createStore(
    rootReducer,
    initailState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store 