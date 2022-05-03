import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import styled from "styled-components";

const Section = styled.section`
  flex-grow: 2;
  background-color: #e3e5f5;
  display: flex;
  flex-direction: column;
  padding: 15em 0em 0em 5em;
`

const Header = styled.header`
  padding-bottom: 1em;
  font-weight: bold;
`

const Input = styled.input`
  box-sizing: border-box;
  padding: 1em;
  margin-top: 1em;
  width: 18em;
  border-radius: 1em;
  border-width: 0.2em;
  border-color: #ff97f7;
  
  &:hover {
    border-color: #97ffdb;
  }
`

const Button = styled.button`
  margin-top: 2em;
  border-radius: 1em;
  width: 7em;
  height: 3em;
  font-weight: bold;
  background-color: #409cf0;
  border-color: #ff97f7;
  color: #ffffff;

  &:hover {
    background-color: #ffffff;
    border-color: #97ffdb;
    color: #409cf0;
  }
`

const Paragraph = styled.p`
  margin-top: 13em;
  font-weight: lighter;

  & > a {
    text-decoration: none;
    font-weight: normal;
  }

  & > a:hover {
    color: #ff97f7;
  }
`

function SignInForm() {
    const navigate = useNavigate();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    async function Submit() {
        const user = {
            login: login,
            password: password,
        }

        const response = await fetch('http://localhost:3001/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
        });
        const token = await response.json();
        localStorage.setItem("token", token.access_token);

        const userResponse = await fetch('http://localhost:3000/user/me', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.access_token}`,
            },
        });

        const me = await userResponse.json();

        localStorage.setItem("userData", JSON.stringify(me));

        switch (me.role){
            case 'admin':
                navigate('/admin/patients');
                break;
            case 'patient':
                navigate('/patients/appointments');
                break;
            case 'doctor':
                navigate('/doctors/appointments');
                break;
        }
    }

    return(
        <Section className="SignInForm">
            <Header className="SignInFormHeader">Sign In</Header>
            <form className="SignInFormHeader">
                <Input type="text" id="fLogin" name="fLogin" className="SignInFormLogin" placeholder="Login" value={login} onChange={event => setLogin(event.target.value)}/>
                <Input type="password" id="fPassword" name="fPassword" className="SignInFormPassword" placeholder="Password" value={password} onChange={event => setPassword(event.target.value)}/>
            </form>
            <Button type="submit" className="SignInFormSubmit" onClick={Submit}>Sign In {">"} </Button>
            <Paragraph>Not have an account? <Link to="/signUp">Sign Up</Link></Paragraph>
        </Section>
    )
}

export default SignInForm;