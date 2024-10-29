import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '../store/authStore';
import axios from 'axios';

interface LoginData {
    user_name: string;
    password: string;
}

interface RegisterData {
    email: string;
    user_name: string;
    first_name: string;
    last_name: string;
    password: string;
    password_confirmation: string;
}

const loginApi = async (data: LoginData) => {
    const response = await axios.post('http://localhost:8000/api/auth/login', data);
    return response.data;
};

const registerApi = async (data: RegisterData) => {
    const response = await axios.post('http://localhost:8000/api/auth/register', data);
    return response.data;
};

// Hook for Login
export const useLogin = () => {
    const setUser = useAuthStore((state) => state.setUser);
    return useMutation({
        mutationFn: loginApi,
        onSuccess: (data) => {
            setUser(data.user);
            localStorage.setItem('token', data.user.token);
        },
    });
};

// Hook for Register
export const useRegister = () => {
    const setUser = useAuthStore((state) => state.setUser);
    return useMutation({
        mutationFn: registerApi,
        onSuccess: (data) => {
            setUser(data.user);
        },
    });
};