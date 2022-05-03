import SignUpBackground from "./background/SignUpBackground";
import SignUpForm from "./form/SignUpForm";
import styled from "styled-components";

const Main = styled.main`
  display: flex;
  flex-direction: row;
  width: 100%;
`

function SignUp() {
    return(
        <Main>
            <SignUpBackground />
            <SignUpForm />
        </Main>
    )
}

export default SignUp;