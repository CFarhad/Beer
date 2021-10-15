import { combineReducers } from 'redux'
import workspace from './workspace'
import signature from './signature'

export default combineReducers({
  editor: workspace,
  signature
})