import axios from 'axios';
import { SERVER_URL } from 'utils/constants';

/**
 * Login
 */

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  message: string;
  token: string;
}

export const login = async ({ email, password }: LoginRequest) => {
  const response = await axios.post<LoginResponse>(
    `${SERVER_URL}/users/login`,
    {
      email,
      password,
    }
  );
  return response.data;
};

/**
 * Signup
 */

interface SignupRequest {
  email: string;
  password: string;
}

interface SignupResponse {
  message: string;
  token: string;
}

export const signup = async ({ email, password }: SignupRequest) => {
  const response = await axios.post<SignupResponse>(
    `${SERVER_URL}/users/create`,
    {
      email,
      password,
    }
  );
  return response.data;
};
