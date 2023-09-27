import React from 'react';
import { Link } from 'react-router-dom';
import './Register.scss';

function Register() {
  return (
    <div>
      <div className="register">
        <div className="card">
          <div className="left">
            <h1>Hello, World.</h1>
            <p>
              Amet id excepteur mollit officia irure aute Lorem enim irure. Aute
              n velit commodo et. Officia exercitation dolor commodo commodo.
              Minim est in ullamco est
            </p>
            <span>Do you have an account?</span>
            <Link to="/login">
              <button>Login</button>
            </Link>
          </div>
          <div className="right">
            <h1>Register</h1>
            <form>
              <input type="text" placeholder="Username" />
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <input type="text" placeholder="Name" />
              <button>Register</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
