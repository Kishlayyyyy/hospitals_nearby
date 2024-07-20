import React from 'react';
import { useRouter } from 'next/router';
import './App.css';
// import GoogleLogin from 'react-google-login';
import GoogleButton from 'react-google-button';

function App() {
  const router = useRouter();

  const handleGoogleLogin = () => {
    const googleAuthUrl = 'http://localhost:3000/?code=4%2F0AcvDMrBcUo80MkN1SuNY0hIutvtia-m9BWcXwNeTuVHTH_rYYp1_00riwxctxSIj_YC6ag&scope=email+profile+openid+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&authuser=0&prompt=consent';
    router.push(googleAuthUrl);
  };

  // const onSuccess = (googleUser) => {
  //   console.log('Login Success: currentUser:', googleUser.profileObj);
  // };

  // const onFailure = (error) => {
  //   console.log('Login Failed:', error);
  // };

  return (
    <div style={{ marginLeft: '10px' }}>
      <h2>Login with Google</h2>
      <GoogleButton onClick={handleGoogleLogin} />
      {/* <GoogleLogin
        clientId="73702640570-rihhs47rm7nbujvik6ec224fqi7vn9ul.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
      /> */}
    </div>
  );
}

export default App;
