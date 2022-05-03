import signUp from "../../medical-2.jpg";
import styled from "styled-components";

const Img = styled.img`
  flex-grow: 1;
  width: 70em;
  height: 48em;
`

function SignUpBackground() {
    return(
        <Img src={signUp} loading={"lazy"} alt="background"/>
    )
}

export default SignUpBackground;