import React, { useContext, useState } from 'react';
import './Login.scss';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';

function Login() {
  const { login } = useContext(AuthContext);

  const [inputs, setInputs] = useState({ username: '', password: '' });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    try {
      login(inputs);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Hello, World.</h1>
          <p>
            Amet id excepteur mollit officia irure aute Lorem enim irure. Aute n
            velit commodo et. Officia exercitation dolor commodo commodo. Minim
            est in ullamco est
          </p>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
