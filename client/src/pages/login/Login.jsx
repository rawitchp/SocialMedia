import React from 'react';
import { Link } from 'react-router-dom';
import './Login.scss';

function Login() {
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
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <button>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;