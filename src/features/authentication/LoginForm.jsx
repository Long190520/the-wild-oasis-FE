import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import SpinnerMini from "../../ui/SpinnerMini";
import { useLogin } from "./useLogin";
import { useOauthLogin } from "./useOauthLogin";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { LoginSocialGoogle, LoginSocialFacebook } from "reactjs-social-login";
import {
  FacebookLoginButton,
  GoogleLoginButton,
} from "react-social-login-buttons";
// import { jwtDecode } from "jwt-decode";

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
  const { oauthLogin, isOauthLoading } = useOauthLogin();
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

  function handleOauth(accessToken, provider) {
    oauthLogin({ accessToken, provider });
  }

  function RedirectSignUp(e) {
    e.preventDefault();
    navigate("/signup");
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
            disabled={isLoading || isOauthLoading}
          />
        </FormRowVertical>
        <FormRowVertical label="Password">
          <Input
            type={passwordShown ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading || isOauthLoading}
          />
          <i onClick={togglePasswordVisibility}>👀</i>
        </FormRowVertical>
        <FormRowVertical>
          <Button size="large" disabled={isLoading || isOauthLoading}>
            {!isLoading ? "Login" : <SpinnerMini />}
          </Button>
        </FormRowVertical>
      </Form>
      <Form>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <p>New to The Wild Oasis ?</p>
          <SignUpLine onClick={RedirectSignUp}>SignUp</SignUpLine>
        </div>
      </Form>
      <LoginSocialFacebook
        isOnlyGetToken
        appId={import.meta.env.VITE_REACT_APP_FB_APP_ID || ""}
        onResolve={({ provider, data }) => {
          handleOauth(data.accessToken, provider);
        }}
        onReject={(err) => {
          console.log(err);
        }}
      >
        <FacebookLoginButton />
      </LoginSocialFacebook>

      <LoginSocialGoogle
        client_id={import.meta.env.VITE_REACT_APP_GG_APP_ID || ""}
        onResolve={({ provider, data }) => {
          handleOauth(data.access_token, provider);
        }}
        onReject={(err) => {
          console.log(err);
        }}
      >
        <GoogleLoginButton />
      </LoginSocialGoogle>
    </>
  );
}

export default LoginForm;
