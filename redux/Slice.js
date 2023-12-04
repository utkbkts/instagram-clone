// import { createSlice } from "@reduxjs/toolkit";

// const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     user: JSON.parse(localStorage.getItem("user-info")) || null,
//   },
//   reducers: {
//     login: (state, action) => {
//       state.user = action.payload;
//       localStorage.setItem("user-info", JSON.stringify(action.payload));
//     },
//     logout: (state) => {
//       state.user = null;
//       localStorage.removeItem("user-info");
//     },
//     setUser: (state, action) => {
//       state.user = action.payload;
//       localStorage.setItem("user-info", JSON.stringify(action.payload));
//     },
//   },
// });
// export const { login, logout, setUser } = authSlice.actions;
// export default authSlice.reducer;

// import { configureStore } from '@reduxjs/toolkit';
// import authReducer from './authSlice';

// const store = configureStore({
//   reducer: {
//     auth: authReducer,
//      Diğer dilimleri (slices) buraya ekleyebilirsiniz.
//   },
// });

// export default store;

//  Bileşen içinde kullanım örneği

// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { login, logout, setUser } from './authSlice';

// const AuthComponent = () => {
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.auth.user);

//   const handleLogin = () => {
//      Kullanıcı girişi işlemleri
//     const userInfo = /* Kullanıcı bilgileri */;
//     dispatch(login(userInfo));
//   };

//   const handleLogout = () => {
//     dispatch(logout());
//   };

//   const handleSetUser = (userInfo) => {
//     dispatch(setUser(userInfo));
//   };

//   return (
//     <div>
//       <p>User: {user ? user.username : 'Guest'}</p>
//       <button onClick={handleLogin}>Login</button>
//       <button onClick={handleLogout}>Logout</button>
//       <button onClick={() => handleSetUser(/* Kullanıcı bilgileri */)}>Set User</button>
//     </div>
//   );
// };

// export default AuthComponent;