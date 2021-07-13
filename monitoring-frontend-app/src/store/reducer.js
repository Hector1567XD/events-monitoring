import eventsReducer        from '../features/events/events-slice'
import subscriptionsReducer from '../features/subscriptions/subscriptions-slice'
import connectionSlice      from '../features/connection/connection-slice'

export default function rootReducer(state = {}, action) {
  return {
    events:         eventsReducer       (state.events,        action),
    subscriptions:  subscriptionsReducer(state.subscriptions, action),
    connection:     connectionSlice     (state.connection,    action)
  }
}
