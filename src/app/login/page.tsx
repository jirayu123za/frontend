"use client";
import React from "react";
import { Container, Image, Title } from "@mantine/core";
import { Login } from "../components/auth/Login";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function loginPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        <div className="hidden lg:flex justify-center items-center h-screen">
          <Image
            src="/auth_img.svg"
            w={800}
            h={800}
            alt="auth_img"
            className="w-full object-contain"
          />
        </div>
        <div className="h-screen flex justify-center items-center flex-col">
          <div className="flex flex-col justify-start items-start mb-6 w-full md:w-[500px] px-4">
            {/* <Image
              src="https://placehold.co/600x400?text=Placeholder"
              w={150}
              h={150}
              alt="logo"
            /> */}
            <Title>Album Sphere</Title>
          </div>
          <Container className="w-full px-4 md:w-[500px]">
            <Login />
          </Container>
        </div>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}