export const reducer = (state: any, action: any) => {  
    switch (action) {
      case 'add':
        return ({
          ...state,
          [action.name]: action.value
        })
      case 'update':
        return ({
          ...state,
          [action.name]: action.setValue ? action.setValue(state[action.name]): action.value
        })
      case 'delete':
        delete state[action.name]
        return state
      default:
        return state
    }
  }