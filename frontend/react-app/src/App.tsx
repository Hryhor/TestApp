import React from 'react';
import './app/assets/styles/app.scss';
import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from './app/hooks';
import {  RootState } from "./app/store/store";
import { checkAuth } from './app/features/auth/authSlice';
import { paths } from './paths';
import Home from './pages/Home';
import { IRequestRefreshDto } from "./interfaces";


function App() {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();

  
  useEffect(() => {
    const userStr = localStorage.getItem('user');
    const refreshToken = localStorage.getItem('tokenR');

    if (userStr && refreshToken) {
      const user = JSON.parse(userStr);
      user.role = 'user';

      const usert = {
        id: user.id,
        name: user.name,
        email: user.email,
        userName: user.userName,
        role: user.role,
      }

      const requestDto: IRequestRefreshDto = {
        refreshToken: refreshToken,
        userDTO: usert,
      };

      dispatch(checkAuth(requestDto));
    }
   
  }, [dispatch]);

  return (
    <div className="App">
      <Routes>
        <Route path={paths.home} element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;