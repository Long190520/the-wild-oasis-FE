import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import SpinnerMini from "../../ui/SpinnerMini";
import { useLogin } from "./useLogin";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const SignUpLine = styled.p`
    color: var(--color-brand-600);
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
`;

function LoginForm() {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading } = useLogin();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    login(
      { email, password },
      {
        onSettled: () => {
          setPassword("");
        },
      }
    );
  }

  function RedirectSignUp(e) {
    e.preventDefault();
    navigate('/signup');
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <FormRowVertical label="Email address">
          <Input
            type="email"
            id="email"
            // This makes this form better for password managers
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            />
        </FormRowVertical>
        <FormRowVertical label="Password">
          <Input
            type={passwordShown ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            />
          <i onClick={togglePasswordVisibility}>👀</i>
        </FormRowVertical>
        <FormRowVertical>
          <Button size="large" disabled={isLoading}>
            {!isLoading ? "Login" : <SpinnerMini />}
          </Button>
        </FormRowVertical>
      </Form>
      <Form>
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem"}}>
          <p>
            New to The Wild Oasis ?
          </p>
          <SignUpLine onClick={RedirectSignUp}>
            SignUp
          </SignUpLine>
        </div>
      </Form>
    </>
  );
}

export default LoginForm;
