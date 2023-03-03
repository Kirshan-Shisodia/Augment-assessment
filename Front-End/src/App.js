import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import ClientDashboard from './components/ClientDashboard';
import AdminDashboard from './components/AdminDashboard';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = (user) => {
    setUser(user);
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setUser(null);
    setLoggedIn(false);
  };

  return (
    <div className="min-h-screen">
      <Router>
        <Header loggedIn={loggedIn} handleLogout={handleLogout} />
        <div className="container mx-auto py-4">
          <Routes>
            <Route path="/" element={
              loggedIn ? (
                user.role === 1 ? (
                  <ClientDashboard user={user} />
                ) : (
                  <AdminDashboard />
                )
              ) : (
                <LoginForm handleLogin={handleLogin} />
              )
            }/>
            <Route path="/signup" element={<SignupForm />}/>
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
