import type { FormModel } from "../../utils/forms/types";

export const loginFormModel: FormModel = {
  id: "login",
  title: "Sign in to your account",
  steps: [
    {
      id: "credentials",
      title: "Sign in to your account",
      fields: [
        {
          name: "username",
          label: "Username",
          type: "text",
          placeholder: "johndoe",
          required: true,
        },
        {
          name: "password",
          label: "Password",
          type: "password",
          placeholder: "••••••••",
          required: true,
        },
      ],
    },
  ],
};

export const registerFormModel: FormModel = {
  id: "register",
  title: "Create an account",
  steps: [
    {
      id: "credentials",
      title: "Create an account",
      fields: [
        {
          name: "username",
          label: "Username",
          type: "text",
          placeholder: "johndoe",
          required: true,
        },
        {
          name: "password",
          label: "Password",
          type: "password",
          placeholder: "••••••••",
          required: true,
        },
        {
          name: "confirmPassword",
          label: "Confirm Password",
          type: "password",
          placeholder: "••••••••",
          required: true,
        },
      ],
    },
  ],
};
