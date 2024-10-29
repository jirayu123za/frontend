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

const loginApi = async (data: LoginData) => {
    const response = await axios.post('http://localhost:8000/api/auth/login', data);
    return response.data;
};

const registerApi = async (data: RegisterData) => {
    const response = await axios.post('http://localhost:8000/api/auth/register', data);
    return response.data;
};

const checkCredentialsApi = async (data: LoginData) => {
    const response = await axios.post('http://localhost:8000/api/auth/checkCredentials', data);
    console.log('Response from API:', response.data);
    return response.data;
};

const logoutApi = async (data: any) => {
    const response = await axios.post('http://localhost:8000/api/auth/logout', data);
    return response.data;
}

// Hook for Login
export const useLogin = () => {
    // const setUser = useAuthStore((state) => state.setUser);
    return useMutation({
        mutationFn: checkCredentialsApi,
        onSuccess: async (data, variables) => {
            console.log('Response from checkCredentialsApi:', data);
            const user_name = data?.user?.user_name;
            const password = variables.password;

            if (user_name && password) {
                const res = await signIn('credentials', {
                    redirect: true,
                    callbackUrl: "/",
                    user_name,
                    password,
                });
                console.log("The response from signIn is:", res);
                return res;
            } else {
                console.error("User information is missing from the response");
            }
        },
        onError: (error) => {
            console.error("Login failed with error:", error);
        },
    });
};

// Hook for Register
export const useRegister = () => {
    // const setUser = useAuthStore((state) => state.setUser);
    return useMutation({
        mutationFn: registerApi,
        onSuccess: async (data, variables) => {
            const user_name = variables.user_name;
            const password = variables.password;

            if (user_name && password) {
                const res = await signIn('credentials', {
                    redirect: true,
                    callbackUrl: "/",
                    user_name,
                    password,
                });
                console.log("The response from signIn is:", res);
                return res;
            } else {
                console.error("User information is missing");
            }
        },
        onError: (error) => {
            console.error("Registration failed with error:", error);
        },
    });
};

export const useLogout = () => {
    const setUser = useAuthStore((state) => state.setUser);
    return useMutation({
        mutationFn: logoutApi,
        onSuccess: () => {
            setUser(null);
        },
    });
};