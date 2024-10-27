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

export function Login(props: PaperProps) {
  const [type, toggle] = useToggle(["login", "register"]);
  const form = useForm({
    initialValues: {
      email: "",
      user_name: "",
      first_name: "",
      last_name: "",
      password: "",
    },
    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
        first_name: (val) => (val.length <= 0 ? "First name is required" : null),
        last_name: (val) => (val.length <= 0 ? "Last name is required" : null),
        user_name: (val) => (val.length <= 0 ? "Username is required" : null),
    },
  });
  const handleSubmit =  (values: typeof form.values) => {
    console.log(values);
    form.reset();
  }

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
            onChange={(event) =>
              form.setFieldValue("password", event.currentTarget.value)
            }
            error={
              form.errors.password &&
              "Password should include at least 6 characters"
            }
            radius="md"
          />

          <Group justify="space-between" mt="md">
            <Anchor
              component="button"
              type="button"
              c="dimmed"
              onClick={() => toggle()}
              size="xs"
            >
              {type === "register"
                ? "Already have an account? Login"
                : "Don't have an account? Register"}
            </Anchor>
            <Button type="submit" radius="xl" className="shadow-sm">
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
