// /components/Register.js
import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled,{keyframes} from 'styled-components';
import { useForm } from 'react-hook-form';
import { ThreeDots } from 'react-loader-spinner';
import { register as registerUser } from '../services/api';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const RegisterContainer = styled.div`
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

const Select = styled.select`
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

function Register() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const userType = watch('userType');

  const onSubmit = useCallback(async (data) => {
    setError('');
    setLoading(true);
    try {
      await registerUser(data.email, data.password, data.userType, data.company);
      navigate('/');
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  return (
    <RegisterContainer>
      <Title>Register</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register('email', { 
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address"
            }
          })}
          placeholder="Email"
          type="email"
        />
        {errors.email && <Error>{errors.email.message}</Error>}
        <Input
          {...register('password', { 
            required: 'Password is required',
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long"
            }
          })}
          placeholder="Password"
          type="password"
        />
        {errors.password && <Error>{errors.password.message}</Error>}
        <Select {...register('userType', { required: 'User type is required' })}>
          <option value="">Select user type</option>
          <option value="user">User</option>
          <option value="recruiter">Recruiter</option>
        </Select>
        {errors.userType && <Error>{errors.userType.message}</Error>}
        {userType === 'recruiter' && (
          <Input
            {...register('company', { required: 'Company is required for recruiters' })}
            placeholder="Company"
          />
        )}
        {errors.company && <Error>{errors.company.message}</Error>}
        <Button type="submit" disabled={loading}>
          {loading ? <ThreeDots color="#ffffff" height={20} width={40} /> : 'Register'}
        </Button>
      </Form>
      {error && <Error>{error}</Error>}
      <StyledLink to="/">Already have an account? Login here</StyledLink>
    </RegisterContainer>
  );
}

export default React.memo(Register);
