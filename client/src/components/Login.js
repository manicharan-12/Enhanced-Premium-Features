// components/Login.js
import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { useForm } from 'react-hook-form';
import { ThreeDots } from 'react-loader-spinner';
import { login } from '../services/api';
import { useGlobalState } from '../context/GlobalStateContext';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const LoginContainer = styled.div`
  background: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: 0 auto;
  animation: ${fadeIn} 0.5s ease-out;
`;

const Title = styled.h2`
  color: #333;
  text-align: center;
  margin-bottom: 30px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 12px;
  margin-bottom: 20px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #4a90e2;
    outline: none;
  }
`;

const Button = styled.button`
  background: #4a90e2;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #357abd;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(74, 144, 226, 0.4);
  }
`;

const Error = styled.p`
  color: #e74c3c;
  text-align: center;
  margin-top: 10px;
`;

const StyledLink = styled(Link)`
  color: #4a90e2;
  text-decoration: none;
  text-align: center;
  margin-top: 20px;
  display: block;

  &:hover {
    text-decoration: underline;
  }
`;

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { updateGlobalState } = useGlobalState();

  const onSubmit = useCallback(async (data) => {
    setError('');
    setLoading(true);
    try {
      const response = await login(data.email, data.password);
      localStorage.setItem('token', response.token);
      updateGlobalState(response.userType, response.plan);
      navigate(response.userType === 'user' ? '/user-dashboard' : '/recruiter-dashboard');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  }, [navigate, updateGlobalState]);

  return (
    <LoginContainer>
      <Title>Login</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } })}
          placeholder="Email"
          type="email"
        />
        {errors.email && <Error>{errors.email.message}</Error>}
        <Input
          {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
          placeholder="Password"
          type="password"
        />
        {errors.password && <Error>{errors.password.message}</Error>}
        <Button type="submit" disabled={loading}>
          {loading ? <ThreeDots color="#ffffff" height={20} width={40} /> : 'Login'}
        </Button>
      </Form>
      {error && <Error>{error}</Error>}
      <StyledLink to="/register">Don't have an account? Register here</StyledLink>
    </LoginContainer>
  );
}

export default Login;