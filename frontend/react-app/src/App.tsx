import React from 'react';
import './app/assets/styles/app.scss';
import { Routes, Route } from 'react-router-dom';
import { paths } from './paths';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={paths.home} element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;