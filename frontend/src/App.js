import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './pages/Auth';
import Events from './pages/Events';
import Bookings from './pages/Bookings';
import MainNavigation from './components/Navigation/MainNavigation';
import React, { Component } from 'react';
import AuthContext from './context/auth-context';

class App extends Component {
  state = {
    token: null,
    userId: null,
  };

  login = (token, userId, tokenExpiration) => {
    this.setState({ token: token, userId: userId });
  };

  logout = () => {
    this.setState({ token: null, userId: null });
  };

  render() {
    return (
      <div>
        <AuthContext.Provider
          value={{
            token: this.state.token,
            userId: this.state.userId,
            login: this.login,
            logout: this.logout,
          }}
        >
          <MainNavigation />
          <main className='main-content'>
            <Routes>
              {/* <Route path='/' element={<Navigate to='/auth' />} /> */}
              {!this.state.token && (
                <Route path='/' element={<Navigate to='/auth' />} />
              )}
              {!this.state.token && (
                <Route path='/auth' element={<AuthPage />} />
              )}
              <Route path='/events' element={<Events />} />
              <Route path='/bookings' element={<Bookings />} />
            </Routes>
          </main>
        </AuthContext.Provider>
      </div>
    );
  }
}

export default App;
