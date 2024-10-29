"use client";
import React from 'react';
import { useSession } from 'next-auth/react';
import { Button, Flex } from '@mantine/core';
import { useLogout } from './hook/useAuth';
// import { useAuthStore } from './store/authStore';

export default function App() {
  const logoutMutation = useLogout();
  const { data: session } = useSession();
  // const { user } = useAuthStore();

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        console.log('Logout successful');
      },
      onError: (error) => {
        console.error('Logout failed', error);
      },
    });
    console.log('Logout button clicked');
  }

  return (
    <div>
      <Flex className='p-3'>
        <Button onClick={handleLogout}> logout </Button>
      </Flex>
      Test Current Date: {new Date().toLocaleDateString()}
      <pre>{JSON.stringify(session, null, 2)}</pre>
      {session ? (
        <>
          <p>Email: {session.user?.email}</p>
        </>
      ) : (
        <p>No session data available</p>
      )}
    </div>
  );
}