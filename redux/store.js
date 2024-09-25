import { configureStore } from '@reduxjs/toolkit';
import signUpReducer from "../redux/slices/authentication/authSlice";
import bvnReducer from '../redux/slices/bvnSlice/bvnSlice';
import userReducer from '../redux/slices/user/userSlice';
import contactsReducer from '../redux/slices/contact/contactSlice'
const store = configureStore({
    reducer: {
        signUp: signUpReducer,
        bvn: bvnReducer,
        user: userReducer,
        contacts: contactsReducer,
    },
  });
  
  export default store;