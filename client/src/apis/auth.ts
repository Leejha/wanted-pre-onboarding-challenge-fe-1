import axios from 'axios';
import { SERVER_URL } from 'utils/constants';

/**
 * Login
 */

interface LoginRequest {
  email: string;
  password: string;
}

export const login = async ({ email, password }: LoginRequest) => {
  const response = await axios.post(`${SERVER_URL}/users/login`, {
    email,
    password,
  });
  return response.data;
};

/**
 * Signup
 */

interface SignUpRequest {
  email: string;
  password: string;
}

interface SignUpResponse {
  message: string;
  token: string;
}

export const signup = async ({ email, password }: SignUpRequest) => {
  const response = await axios.post<SignUpResponse>(
    `${SERVER_URL}/users/create`,
    {
      email,
      password,
    }
  );
  return response.data;
};
