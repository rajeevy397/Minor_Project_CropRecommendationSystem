import React, { useState, useEffect } from 'react';
import * as Components from './LoginRegisterComponents';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './LoginRegister.css';

function LoginRegister() {
  const navigate = useNavigate();

  const [signIn, toggle] = React.useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [LoginEmailError, setLoginEmailError] = useState('');
  const [LoginPasswordError, setLoginPasswordError] = useState('');

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  async function LogIn(e) {
    e.preventDefault();

    // Validate inputs
    const LoginEmailError = validateEmail(loginEmail);
    const LoginPasswordError = validatePassword(loginPassword);

    if (LoginEmailError || LoginPasswordError) {
      setLoginEmailError(LoginEmailError);
      setLoginPasswordError(LoginPasswordError);
      return;
    }

    try {
      await axios
        .post('http://localhost:8000/login', {
          loginEmail,
          loginPassword,
        })
        .then((res) => {
          if (res.data === 'exist') {
            toast.success('Login Successful', {
              autoClose: 1000,
            });
            localStorage.setItem('isLoggedIn', 'true');
            navigate('/', { replace: true });
          } else if (res.data === 'WrongPassword') {
            toast.error('WrongPassword', {
              autoClose: 1000,
            });
          } else if (res.data === 'notExist') {
            toast.error('login Failed! Please signup', {
              autoClose: 1000,
            });
          }
        })
        .catch((e) => {
          toast.error('wrong details', {
            autoClose: 1000,
          });
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  }

  async function signUp(e) {
    e.preventDefault();

    // Validate inputs
    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (nameError || emailError || passwordError) {
      setNameError(nameError);
      setEmailError(emailError);
      setPasswordError(passwordError);
      return;
    }

    try {
      await axios
        .post('http://localhost:8000/signup', {
          name,
          email,
          password,
        })
        .then((res) => {
          if (res.data === 'exist') {
            toast.error('user already exist', {
              autoClose: 1000,
            });
          } else if (res.data === 'notExist') {
            toast.success('registration successful', {
              autoClose: 1000,
            });
            localStorage.setItem('isLoggedIn', 'true');
            navigate('/', { replace: true });
          }
        })
        .catch((e) => {
          toast.error('wrong details', {
            autoClose: 1000,
          });
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (isLoggedIn) {
      navigate('*');
    }
  }, [navigate]);

  function validateName(value) {
    if (!value) {
      return 'Name is required';
    }
    return '';
  }

  function validateEmail(value) {
    if (!value) {
      return 'Email is required';
    }
    if (!/\S+@\S+\.\S+/.test(value)) {
      return 'Email is invalid';
    }
    return '';
  }

  function validatePassword(value) {
    if (!value) {
      return 'Password is required';
    }
    if (value.length < 6) {
      return 'Password must be at least 6 characters long';
    }
    return '';
  }

  return (
    <div className="loginRegister">
      <Components.Container>
        <Components.SignUpContainer signinIn={signIn}>
          <Components.Form action="POST">
            <Components.Title>Create Account</Components.Title>
            <Components.Input
              type="text"
              onChange={(e) => {
                setName(e.target.value);
                setNameError('');
              }}
              placeholder="Name"
            />
            {nameError && <Components.Error>{nameError}</Components.Error>}
            <Components.Input
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError('');
              }}
              placeholder="Email"
            />
            {emailError && <Components.Error>{emailError}</Components.Error>}
            <Components.Input
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError('');
              }}
              placeholder="Password"
            />
            {passwordError && <Components.Error>{passwordError}</Components.Error>}
            <Components.Button onClick={signUp}>Sign Up</Components.Button>
          </Components.Form>
        </Components.SignUpContainer>

        <Components.SignInContainer signinIn={signIn}>
          <Components.Form action="POST">
            <Components.Title>Sign in</Components.Title>
            <Components.Input
              type="email"
              onChange={(e) => {
                setLoginEmail(e.target.value);
                setLoginEmailError('');
              }}
              placeholder="Email"
            />
            {LoginEmailError && <Components.Error>{LoginEmailError}</Components.Error>}
            <Components.Input
              type="password"
              onChange={(e) => {
                setLoginPassword(e.target.value);
                setLoginPasswordError('');
              }}
              placeholder="Password"
            />
            {LoginPasswordError && <Components.Error>{LoginPasswordError}</Components.Error>}
            <Components.Anchor href="#">
              Forgot your password?
            </Components.Anchor>
            <Components.Button onClick={LogIn}>Sigin In</Components.Button>
            <ToastContainer />
          </Components.Form>
        </Components.SignInContainer>

        <Components.OverlayContainer signinIn={signIn}>
          <Components.Overlay signinIn={signIn}>
            <Components.LeftOverlayPanel signinIn={signIn}>
              <Components.Title>Welcome Back!</Components.Title>
              <Components.Paragraph>
                To keep connected with us please login with your personal info
              </Components.Paragraph>
              <Components.GhostButton onClick={() => toggle(true)}>
                Sign In
              </Components.GhostButton>
            </Components.LeftOverlayPanel>

            <Components.RightOverlayPanel signinIn={signIn}>
              <Components.Title>Hello, Farmers!</Components.Title>
              <Components.Paragraph>
                Enter Your personal details and start journey with us
              </Components.Paragraph>
              <Components.GhostButton onClick={() => toggle(false)}>
                Sigin Up
              </Components.GhostButton>
            </Components.RightOverlayPanel>
          </Components.Overlay>
        </Components.OverlayContainer>
      </Components.Container>
    </div>
  );
}

export default LoginRegister;
