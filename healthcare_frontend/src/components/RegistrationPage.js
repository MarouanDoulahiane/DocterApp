    import React, { useState, useEffect } from 'react';
    import { useNavigate, useLocation } from 'react-router-dom';
    import axios from 'axios';


    const RegistrationPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isLogin, setIsLogin] = useState(location.pathname === '/login');
    const [formData, setFormData] = useState({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
    const [error, setError] = useState('');
  
    
    const authenticateUser = async (sessionId) => {
      try {
        const response = await axios.get('/api/check_session/', {
          headers: {
            'Authorization': `Session ${sessionId}`,
          },
        });
        if (response.data.isValid) {
          // User is authenticated, you can now display protected content
          console.log('User is authenticated:', response.data);
          navigate('/');
        } else {
          // Session is no longer valid, clear the local storage
          localStorage.removeItem('sessionId');
        }
      } catch (error) {
        console.error('Authentication error:', error);
        // Session is no longer valid, clear the local storage
        localStorage.removeItem('sessionId');
      }
    };
  
    useEffect(() => {
      // Check if the user is already logged in
      const sessionId = localStorage.getItem('sessionId');
      if (sessionId) {
        // Use the session ID to authenticate the user
        authenticateUser(sessionId);
      }
    }, []);
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      // Check if password matches confirm password
      if (!isLogin && formData.password !== formData.confirmPassword) {
        setError('Password and Confirm Password do not match');
        return;
      }
  
      try {
        const url = isLogin ? 'http://localhost:8000/api/login/' : 'http://localhost:8000/api/register/';
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (response.ok) {
          // Store the session ID in local storage
          localStorage.setItem('sessionId', data.sessionId);
          if (isLogin) {
            authenticateUser(data.sessionId);
          } else {
            navigate('/');
          }
          console.log(isLogin ? 'Login successful:' : 'Registration successful:', data);
        } else {
          setError(data.error || (isLogin ? 'Login failed' : 'Registration failed'));
        }
      } catch (error) {
        console.error('Error during authentication:', error.message);
        setError('Error during authentication');
      }
    };
  
    const toggleAuthMode = () => {
      setIsLogin((prevState) => !prevState);
      setError('');
    };
  
    const [minHeight, setMinHeight] = useState(0);

    useEffect(() => {
        const updateMinHeight = () => {
        const windowHeight = window.innerHeight;
        const footerHeight = 72 + 60; // Assuming the footer has a fixed height of 50 pixels
        const newMinHeight = windowHeight - footerHeight;
        setMinHeight(newMinHeight);
        };

        updateMinHeight();
        window.addEventListener('resize', updateMinHeight);

        return () => {
        window.removeEventListener('resize', updateMinHeight);
        };
    }, []);

    return (
        <div className="flex flex-col  bg-gradient-to-r from-[#E7F0FF] to-[#E8F1FF]" style={{ minHeight: `${minHeight}px` }}>
        <div className="flex-grow flex justify-center items-center"> 
            <div className="text-center">
            <h1 className="text-4xl font-bold mb-6">{isLogin ? 'Login' : 'Register New Account'}</h1>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit}>
                        {(
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                    Username
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="username"
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        {!isLogin && (
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        )}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="password"
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        {!isLogin && (
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                                    Confirm Password
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="confirmPassword"
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
    required
                                />
                            </div>
                        )}
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            {isLogin ? 'Login' : 'Register'}
                        </button>
                    </form>
            <p className="mt-4">
                {isLogin ? "Don't have an account?" : 'Already have an account?'}
                <button className="text-blue-500 ml-2" onClick={toggleAuthMode}>
                {isLogin ? 'Register here' : 'Login here'}
                </button>
            </p>
            </div>
        </div>
        </div>
    );
    };

    export default RegistrationPage;