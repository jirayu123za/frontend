import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Anchor,
  Stack,
  Flex,
} from "@mantine/core";
import { GoogleButton } from "./button/GoogleButton";
import { useDisclosure } from '@mantine/hooks';
import { useAuthStore } from '@/app/store/authStore';
import { useLogin, useRegister } from "@/app/hook/useAuth";
import { notifications } from '@mantine/notifications';
import { useRouter } from "next/navigation";

export function Login(props: PaperProps) {
  const [type, press] = useToggle(["login", "register"]);
  const [visible, { toggle }] = useDisclosure(false);
  const router = useRouter();
  const loginMutation = useLogin();
  const registerMutation = useRegister();
  const form = useForm({
    initialValues: {
      email: "",
      user_name: "",
      first_name: "",
      last_name: "",
      password: "",
      password_confirmation: "",
    },
    validate: {
      email: (val) => type === "register" && (/^\S+@\S+$/.test(val)
          ? null 
          : "Invalid email"),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
      password_confirmation: (val): string | null =>
        type === "register" && val !== form.values.password
          ? "Passwords do not match" 
          : null,
      first_name: (val) => (type === "register" && val.length <= 0 
          ? "First name is required" 
          : null),
      last_name: (val) => (type === "register" && val.length <= 0 
        ? "Last name is required" 
        : null),
      user_name: (val) => (val.length <= 0 
        ? "Username is required" 
        : null),
    },
  });
  const handleSubmit = (values: typeof form.values) => {
    if (type === "register") {
      registerMutation.mutate(values, {
        onSuccess: () => {
          notifications.show({
            title: 'Registration Successful',
            message: 'You have registered successfully!',
            color: 'green',
          });
        },
        onError: (error) => {
          notifications.show({
            title: 'Registration Failed',
            message: error.message || 'Registration failed!',
            color: 'red',
          });
        },
      });
      console.log("Registering user with values:", values);
    } else if (type === "login") {
      loginMutation.mutate(values, {
        onSuccess: () => {
          notifications.show({
            title: 'Login Successful',
            message: 'You have logged in successfully!',
            color: 'green',
          });
          router.push('/');
        },
        onError: (error) => {
          notifications.show({
            title: 'Login Failed',
            message: error.message || 'Login failed!',
            color: 'red',
          });
        },
      });
      console.log("Logging in with values:", values);
    }
    form.reset();
  };

  return (
    <Paper radius="md" p="xl" shadow="lg" withBorder {...props}>
      <Text size="lg" fw={500} pb={5}>
        Welcome to Website name, {type} with
      </Text>

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          {type === "register" && (
            <Flex>
            <TextInput pr={20}
              label="First Name"
              placeholder="First Name"
              value={form.values.first_name}
              onChange={(event) =>
                form.setFieldValue("first_name", event.currentTarget.value)
              }
              radius="md"
              required
            />
            <TextInput
            label="Last Name"
            placeholder="Last Name"
            value={form.values.last_name}
            onChange={(event) =>
              form.setFieldValue("last_name", event.currentTarget.value)
            }
            radius="md"
            required
          />
            </Flex> 
          )}

        {type === "register" && (
          <TextInput
            required
            label="Email"
            placeholder="exampleo@email.com"
            value={form.values.email}
            onChange={(event) =>
              form.setFieldValue("email", event.currentTarget.value)
            }
            error={form.errors.email && "Invalid email"}
            radius="md"
          />
          )}
          <TextInput
            required
            label="Username"
            placeholder="Your Username"
            value={form.values.user_name}
            onChange={(event) =>
              form.setFieldValue("user_name", event.currentTarget.value)
            }
            error={form.errors.user_name && "Invalid user_name"}
            radius="md"
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            visible={visible}
            onVisibilityChange={toggle}
            onChange={(event) =>
              form.setFieldValue("password", event.currentTarget.value)
            }
            error={
              form.errors.password &&
              "Password should include at least 6 characters"
            }
            radius="md"
          />

         {type === "register" && (
          <PasswordInput
            required
            label="Confirm Password"
            placeholder="Your password"
            value={form.values.password_confirmation}
            visible={visible}
            onVisibilityChange={toggle}
            onChange={(event) =>
              form.setFieldValue("password_confirmation", event.currentTarget.value)
            }
            error={
              form.errors.password_confirmation &&
              "Passwords do not match"
            }
            radius="md"
          />
          )}

          <Group justify="space-between" mt="md">
            <Anchor
              component="button"
              type="button"
              c="dimmed"
              onClick={() => {
                press(); 
                form.reset();
              }}
              size="xs"
            >
              {type === "register"
                ? "Already have an account? Login"
                : "Don't have an account? Register"}
            </Anchor>
            <Button type="submit" radius="xl" className="shadow-sm" loading={loginMutation.status === 'pending' || registerMutation.status === 'pending'}>
              {upperFirst(type)}
            </Button>
          </Group>
          <Divider
            label="Or continue with email"
            labelPosition="center"
            my="lg"
          />
          <Group grow mb="md">
            <GoogleButton className="shadow-sm" radius="xl" disabled>Google</GoogleButton>
          </Group>
        </Stack>
      </form>
    </Paper>
  );
}
