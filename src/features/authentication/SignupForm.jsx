import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignup } from "./useSignup";
import FormRowVertical from "../../ui/FormRowVertical";
import { useNavigate } from "react-router-dom";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { signup, isLoading } = useSignup();
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;
  const navigate = useNavigate();

  function onSubmit({ firstName, lastName, email, password, passwordConfirm }) {
    signup(
      { firstName, lastName, email, password, passwordConfirm },
      {
        onSettled: () => reset(),
      }
    );
  }

  function Return(e) {
    e.preventDefault();
    navigate('/login');
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRowVertical label="Fisrt name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="firstName"
          disabled={isLoading}
          {...register("firstName", { required: "this field is required" })}
        />
      </FormRowVertical>

      <FormRowVertical label="Last name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="lastName"
          disabled={isLoading}
          {...register("lastName", { required: "this field is required" })}
        />
      </FormRowVertical>

      <FormRowVertical label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isLoading}
          {...register("email", {
            required: "this field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please enter a valid email address",
            },
          })}
        />
      </FormRowVertical>

      <FormRowVertical
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          disabled={isLoading}
          {...register("password", {
            required: "this field is required",
            minLength: {
              value: 8,
              message: "Password needs a minimum of 8 characters",
            },
          })}
        />
      </FormRowVertical>

      <FormRowVertical label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isLoading}
          {...register("passwordConfirm", {
            required: "this field is required",
            validate: (value) =>
              value === getValues().password || "Password need to match",
          })}
        />
      </FormRowVertical>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          disabled={isLoading}
          onClick={Return}
        >
          Return
        </Button>
        <Button
          variation="secondary"
          type="reset"
          disabled={isLoading}
          onClick={reset}
        >
          Cancel
        </Button>
        <Button disabled={isLoading}>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
