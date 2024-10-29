import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '../store/authStore';
import axios from 'axios';
import { signIn } from 'next-auth/react';

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

// const loginApi = async (data: LoginData) => {
//     const response = await axios.post('http://localhost:8000/api/auth/login', data);
//     return response.data;
// };

const registerApi = async (data: RegisterData) => {
    const response = await axios.post('http://localhost:8000/api/auth/register', data);
    return response.data;
};

// Hook for Login
export const useLogin = () => {
    // const setUser = useAuthStore((state) => state.setUser);

    // return useMutation({
    //     mutationFn: loginApi,
    //     onSuccess: (data) => {
    //         setUser(data.user);
    //     },
    // });
    return useMutation({
        mutationFn: async (data: LoginData) => {
            const res = await signIn('credentials', {
                redirect: false,
                user_name: data.user_name,
                password: data.password,
            });
            if (res?.error) {
                throw new Error(res.error);
            }
            return res;
        },
        onSuccess: () => {
            console.log('Login successful');
        },
        onError: (error) => {
            console.error("Login failed:", error);
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