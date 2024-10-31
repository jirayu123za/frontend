'use client';
import React, { useRef, useState } from "react";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import Nav from "../components/nav/Navbar";
import { FooterCentered } from "../components/footer/FooterCentered";
import { Avatar, Button, Container, Flex, Group, MultiSelect, Paper, Select, TextInput, Title, Text, Textarea, PasswordInput, Input } from "@mantine/core";
import { useForm } from '@mantine/form';

export function page() {
  const form = useForm({
    initialValues: {
      first_name: '',
      last_name: '',
      user_name: '',
      email: '',
      password: '',
      phone_no: '',
      gender: '',
      address: '',
      profile_image: '',
    },
    validate: {

    },
  });

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      reader.onload = () => {
        setProfileImage(reader.result as string);
        form.setFieldValue('profile_image', reader.result as string); // Store the base64 string in the form data
      };
    }
  };

  return (
    <>
      <Nav />
      <Flex justify="center" pt={20} pb={20} style={{ minHeight: '85vh', paddingTop: '20px', paddingBottom: '20px' }}>
        <Container size="lg">
          <Paper shadow="lg" p="xl" radius="md" withBorder>
            <form onSubmit={form.onSubmit((values) => console.log(values))}>
              <Title size="h2" fw={700} mb="md">
                Personal Information
              </Title>
              <Group align="center" pb="lg">
                <Avatar
                  size="xl"
                  radius="xl"
                  src={profileImage || undefined}
                  onClick={handleAvatarClick}
                  style={{ cursor: 'pointer' }}
                />
                <Text size="xl" fw={700} variant="gradient" gradient={{ from: 'blue', to: 'cyan', deg: 90 }}>
                  Hello, {form.values.first_name} {form.values.last_name}
                </Text>
                <Input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
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
              </Group>

              <Group grow mb="sm">
                <TextInput
                  placeholder="Username"
                  label="Username"
                  required
                  {...form.getInputProps('user_name')}
                />
               <PasswordInput
                  placeholder="Password"
                  label="Password"
                  required
                  {...form.getInputProps('password')}
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