// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // Access the login function from the AuthContext
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, role: selectedRole }),
      });

      const result = await response.json();

      if (result.success) {
        // Call the login function from the AuthContext to update the user state
        const { id, username } = result.user;
        login(id, username);
        console.log('User ID:', id);
        console.log('Username:', username);
        
        if (selectedRole === 'Recruiter') {
          navigate('/dashboard');
          
        } else if (selectedRole === 'Academy') {
          navigate('/academy-dashboard');
        } else {
          alert('Invalid role');
        }
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="col-md-6 offset-md-3">
        <div className="card" style={{ background: 'linear-gradient(45deg, #1a237e, #004d40)', color: 'white' }}>
          <div className="card-header text-center">
            <h2>Login</h2>
          </div>
          <div className="card-body">
            <form>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password:
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="role" className="form-label">
                  Select Role:
                </label>
                <select
                  className="form-select"
                  id="role"
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                >
                  <option value="">Select Role</option>
                  <option value="Recruiter">Recruiter</option>
                  <option value="Academy">Academy</option>
                </select>
              </div>
              <button type="button" className="btn btn-light" onClick={handleLogin}>
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
