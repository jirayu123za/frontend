'use client';
import React, { useEffect, useRef, useState } from "react";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import Nav from "../components/nav/Navbar";
import { FooterCentered } from "../components/footer/FooterCentered";
import { Avatar, Button, Container, Flex, Group, Paper, Select, TextInput, Title, Text, Textarea, PasswordInput, Input, LoadingOverlay } from "@mantine/core";
import { useForm } from '@mantine/form';
import { useSession } from "next-auth/react";
import { useSubmitUserInformation } from '../hook/useUserinfo';

interface CustomUser {
  token: string;
  first_name?: string | null;
  last_name?: string | null;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  user_name?: string | null;
  phone_no?: number | null;
  gender?: string | null;
  address?: string | null;
}

declare module "next-auth" {
  interface Session {
    user?: CustomUser;
  }
}

export function page() {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const mutation = useSubmitUserInformation();

  const form = useForm({
    initialValues: {
      first_name: '',
      last_name: '',
      user_name: '',
      email: '',
      password: '',
      password_confirmation: '',
      phone_no: '',
      gender: '',
      address: '',
      profile_image: '',
    },
    validate: {

    },
  });

  useEffect(() => {
    if (session) {
      form.setValues({
        first_name: session.user?.first_name || '',
        last_name: session.user?.last_name || '',
        email: session.user?.email || '',
        user_name: session.user?.user_name || '',
        phone_no: session.user?.phone_no?.toString() || '',
        gender: session.user?.gender || '',
        address: session.user?.address || '',
      });
    }
    console.log("The session is", session);
  }, [session]);

  if (loading) {
    return <LoadingOverlay visible />;
  }
  
    const handleSubmit = (values: typeof form.values) => {
        const formData = new FormData();
        formData.append('first_name', values.first_name);
        formData.append('last_name', values.last_name);
        formData.append('email', values.email);
        formData.append('user_name', values.user_name);
        formData.append('password', values.password);
        formData.append('phone_no', values.phone_no);
        formData.append('gender', values.gender);
        formData.append('address', values.address);
        formData.append('password_confirmation', values.password_confirmation);

        if (session && session.user) {
          const token = session.user.token || ''; // ดึง token จาก session
          mutation.mutate({ formData, token });
        }
    };

  return (
    <>
      <Nav />
      <Flex justify="center" pt={20} pb={20} style={{ minHeight: '85vh', paddingTop: '20px', paddingBottom: '20px' }}>
        <Container size="lg">
          <Paper shadow="lg" p="xl" radius="md" withBorder>
            <form onSubmit={form.onSubmit((values) => { console.log(values); handleSubmit(values); })}>
              <Title size="h2" fw={700} mb="md">
                Personal Information
              </Title>
              <Group align="center" pb="lg">
                <Avatar
                  size="xl"
                  radius="xl"
                  // src={profileImage || undefined}
                  // onClick={handleAvatarClick}
                  style={{ cursor: 'pointer' }}
                />
                <Text size="xl" fw={700} variant="gradient" gradient={{ from: 'blue', to: 'cyan', deg: 90 }}>
                  Hello, {form.values.first_name} {form.values.last_name}
                </Text>
                {/* <Input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                /> */}
              </Group>
              <Group grow mb="sm">
                <TextInput
                  placeholder="First Name"
                  label="First Name"
                  required
                  {...form.getInputProps('first_name')}
                />
                <TextInput
                  placeholder="Last Name"
                  label="Last Name"
                  required
                  {...form.getInputProps('last_name')}
                />
              </Group>

              <Group grow mb="sm">
                <TextInput
                  placeholder="Email"
                  label="Email"
                  type="email"
                  required
                  {...form.getInputProps('email')}
                />                
                <TextInput
                  placeholder="Username"
                  label="Username"
                  required
                  {...form.getInputProps('user_name')}
                />
              </Group>

              <Group grow mb="sm">
                <PasswordInput
                  placeholder="Password"
                  label="Password"
                  required
                  {...form.getInputProps('password')}
                />          
                 <PasswordInput
                  placeholder="password_confirmation"
                  label="password_confirmation"
                  required
                  {...form.getInputProps('password_confirmation')}
                />         
              </Group>
              <Group grow mb="sm">
                <Select
                  placeholder="Gender"
                  label="Gender"
                  searchable
                  nothingFoundMessage="No options"
                  data={['Male', 'Female', 'Other']}
                  required
                  {...form.getInputProps('gender')}
                />
                <TextInput
                  placeholder="Phone Number"
                  label="Phone Number"
                  required
                  {...form.getInputProps('phone_no')}
                />
              </Group>
              <Textarea
                placeholder="Address"
                label="Address"
                autosize
                minRows={2}
                maxRows={4}
                required
                {...form.getInputProps('address')}
                mb="lg"
              />
              <Button type="submit" fullWidth color="blue" size="md">
                Save Information
              </Button>
            </form>
          </Paper>
        </Container>
      </Flex>
      <FooterCentered />
    </>
  );
}

export default page;
          {/* <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <form>
              <div className="space-y-6">
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-base/7 font-semibold text-gray-900">
                    Personal Information
                  </h2>
                  <p className="mt-1 text-sm/6 text-gray-600">
                    Use a permanent address where you can receive mail.
                  </p>
                  <hr className="mt-7"></hr>
                  <div className="mt-7 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        First name
                      </label>
                      <div className="mt-2">
                        <input
                          id="first-name"
                          name="first-name"
                          type="text"
                          autoComplete="given-name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="last-name"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Last name
                      </label>
                      <div className="mt-2">
                        <input
                          id="last-name"
                          name="last-name"
                          type="text"
                          autoComplete="family-name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label
                        htmlFor="email"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                        />
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="street-address"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Address
                      </label>
                      <div className="mt-2">
                        <input
                          id="street-address"
                          name="street-address"
                          type="text"
                          autoComplete="street-address"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                      <label
                        htmlFor="city"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        City
                      </label>
                      <div className="mt-2">
                        <input
                          id="city"
                          name="city"
                          type="text"
                          autoComplete="address-level2"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="region"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        State / Province
                      </label>
                      <div className="mt-2">
                        <input
                          id="region"
                          name="region"
                          type="text"
                          autoComplete="address-level1"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="postal-code"
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        ZIP / Postal code
                      </label>
                      <div className="mt-2">
                        <input
                          id="postal-code"
                          name="postal-code"
                          type="text"
                          autoComplete="postal-code"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                  type="button"
                  className="text-sm/6 font-semibold text-gray-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div> */}