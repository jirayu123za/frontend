import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '../store/authStore';
import axios from 'axios';
import { signIn, signOut, useSession } from 'next-auth/react';
import { ISODateString } from 'next-auth';

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

export interface CustomSession {
    user?: CustomUser;
    expires: ISODateString;
}

export interface CustomUser {
    id?: string | null;
    first_name?: string | null;
    last_name?: string | null;
    email?: string | null;
    profile_image?: string | null;
    token?: string | null;
    created_at?: string | null;
    updated_at?: string | null;
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

const logoutApi = async (token: string) => {
    console.log("Sending token:", token);
    const response = await axios.post('http://localhost:8000/api/auth/logout', {}, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
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
    // const setUser = useAuthStore((state) => state.setUser);
    const { data: session } = useSession();
    const customSession = session as CustomSession | null;
    const token = customSession?.user?.token;

    console.log("Token being sent useLogout :", token);

    return useMutation({
        mutationFn: () => logoutApi(token!),
        onSuccess: () => {
            // setUser(null);
            signOut({
                callbackUrl: "/",
                redirect: true,
            });
            console.log("User has been logged out");
        },
    });
};