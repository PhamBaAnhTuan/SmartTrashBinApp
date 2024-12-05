const initialState = {
   isAuthenticated: undefined,
   user: null,
   trash: null,
}
export const authReducer = (state = initialState, action: any) => {

   switch (action.type) {
      case 'SIGN_IN':
         return {
            ...state,
            isAuthenticated: true,
            user: action.payload,
         }

      case 'SIGN_UP':
         return {
            ...state,
         }
      case 'SIGN_OUT':
         return {
            ...state,
            isAuthenticated: action.payload,
            user: null,
         }
      case 'GET_TRASH_DATA':
         return {
            ...state,
            trash: action.payload
         }
      default:
         return state
   }
}
