import React from 'react';

import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import MainPageContainer from './pages/main/Main.page.container';
import UserDetailsPageContainer from './pages/user-detail/UserDetails.page.container';
import { Provider } from 'react-redux';
import { store } from './store/store';

function App() {
  return (
    <Provider store={store}>
      <div className='App'>
        <Router>
          <Routes>
            <Route path='/' element={<MainPageContainer />} />
            <Route
              path='/user/:userId'
              element={<UserDetailsPageContainer />}
            />
          </Routes>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
