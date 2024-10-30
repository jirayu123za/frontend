import { useState, useEffect } from 'react';
import { TextInput, Button, Select, Card, Group, Avatar } from '@mantine/core';
import axios from 'axios';

const EditProfile = () => {
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    gender: '',
    language: '',
    dateOfBirth: '',
    twitter: '',
    linkedIn: '',
    facebook: '',
    google: '',
    slogan: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await axios.get('/api/profile/1'); // fetch by user id
      setProfile(response.data);
    };
    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    await axios.post(`/api/profile/1`, profile); // update by user id
    alert('Profile updated!');
  };

  return (
    <Card className="p-8 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <Group justify="center">
        <Avatar src="profile_pic_url" size="xl" radius="xl" />
        </Group>
      <TextInput
        label="First Name"
        name="firstName"
        value={profile.firstName}
        onChange={handleChange}
        className="mt-4"
      />
      <TextInput
        label="Last Name"
        name="lastName"
        value={profile.lastName}
        onChange={handleChange}
        className="mt-4"
      />
      <TextInput
        label="Email"
        name="email"
        value={profile.email}
        onChange={handleChange}
        className="mt-4"
      />
      <TextInput
        label="Phone"
        name="phone"
        value={profile.phone}
        onChange={handleChange}
        className="mt-4"
      />
      <TextInput
        label="Address"
        name="address"
        value={profile.address}
        onChange={handleChange}
        className="mt-4"
      />
      <Select
        label="Gender"
        value={profile.gender || ''} // ใช้ค่าเป็นสายอักขระเสมอ
        onChange={(value) => setProfile({ ...profile, gender: value || 'Male' })} // ตั้งค่า default เป็น 'Male' หาก value เป็น null
        data={['Male', 'Female', 'Other']}
        className="mt-4"
        />
      <TextInput
        label="Slogan"
        name="slogan"
        value={profile.slogan}
        onChange={handleChange}
        className="mt-4"
      />
      <Button onClick={handleSave} fullWidth className="mt-6 bg-blue-500 hover:bg-blue-600">
        Save
      </Button>
    </Card>
  );
};

export default EditProfile;
