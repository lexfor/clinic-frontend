import SignUpBackground from "../signUp/background/SignUpBackground";
import SignInForm from "./form/SignInForm";
import styled from "styled-components";

const Main = styled.main`
  display: flex;
  flex-direction: row;
  width: 100%;
`
function SignIn() {
    return(
        <Main>
            <SignUpBackground />
            <SignInForm />
        </Main>
    )
}

export default SignIn;