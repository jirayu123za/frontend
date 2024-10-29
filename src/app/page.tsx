"use client";

import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import React from 'react';
// import { useSession } from "next-auth/react";
// import { useAuthStore } from './store/authStore';

export default function App() {
  const { data: session } = useSession();
  // const { user } = useAuthStore(); 
  // const session = await getServerSession();
  return (
    <div>
      Test Current Date: {new Date().toLocaleDateString()}
      <pre>{JSON.stringify(session, null, 2)}</pre>
      {/* <div>{user ? JSON.stringify(user) : "No user data"}</div> */}
      {session ? (
        <>
          <p>Welcome, {session.user?.name}</p>
          <p>Email: {session.user?.email}</p>
        </>
      ) : (
        <p>No session data available</p>
      )}
    </div>
  );
}