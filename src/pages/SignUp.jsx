import styled from "styled-components";
import Logo from "../ui/Logo";
import Heading from "../ui/Heading";
import SignupForm from "../features/authentication/SignupForm";

const SignUpLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 0.8rem;
  background-color: var(--color-grey-50);
`;

function SignUp() {
  return (
    <SignUpLayout>
      <Logo />
      <Heading as="h3"></Heading>
      <SignupForm />
      
    </SignUpLayout>
  );
}

export default SignUp;
