import React, { useEffect } from 'react';
import GoogleButton from 'react-google-button';
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import Dashboard from './components/dahboard';
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const LoginPage = () => {
  const navigate = useNavigate();
  const query = useQuery();

  useEffect(() => {
    const code = query.get('code');
    if (code) {
      // Exchange authorization code for access token
      fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          code: code,
          client_id: '73702640570-rihhs47rm7nbujvik6ec224fqi7vn9ul.apps.googleusercontent.com',
          client_secret: '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',
          redirect_uri: 'http://localhost:3000',
          grant_type: 'authorization_code',
        }),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Access Token:', data.access_token);
          // Save the access token and navigate to the dashboard
          localStorage.setItem('access_token', data.access_token);
          navigate('/dashboard');
        })
        .catch(error => console.error('Error fetching access token:', error));
    }
  }, [query, navigate]);

  const handleLogin = () => {
    console.log('Google SSO login');
    window.location.href = 'https://accounts.google.com/o/oauth2/v2/auth?client_id=73702640570-rihhs47rm7nbujvik6ec224fqi7vn9ul.apps.googleusercontent.com&redirect_uri=http://localhost:3000&response_type=code&scope=openid%20email%20profile&access_type=offline&prompt=consent';
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="login-container">
          <h1>Welcome</h1>
          <p>Please log in using your Google account</p>
          <GoogleButton style={{ marginLeft: '100px' }} onClick={handleLogin} />
        </div>
      </header>
    </div>
  );
};



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
