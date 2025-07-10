import React from 'react';

import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import MainPageContainer from './pages/main/Main.page.container';
import UserDetailsPageContainer from './pages/user-detail/UserDetails.page.container';

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' element={<MainPageContainer />} />
          <Route path='/movie/:imdbID' element={<UserDetailsPageContainer />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
