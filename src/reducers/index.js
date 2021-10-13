import { combineReducers } from 'redux'
import workspace from './workspace'

export default combineReducers({
  editor: workspace
})