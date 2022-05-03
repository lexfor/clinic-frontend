import { useState} from "react";
import {Route, Link, NavLink, useNavigate} from "react-router-dom";
import styled from "styled-components";
import SignIn from "../../signIn/SignIn";
import SignUp from "../SignUp";

const Section = styled.section`
  flex-grow: 2;
  background-color: #e3e5f5;
  display: flex;
  flex-direction: column;
  padding: 3em 0em 0em 5em;
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
  margin-top: 2em;
  font-weight: lighter;

  & > a {
    text-decoration: none;
    font-weight: normal;
  }

  & > a:hover {
    color: #ff97f7;
  }
`

function SignUpForm() {
    const navigate = useNavigate();
    const [login, setLogin] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthday, setBirthday] = useState('');
    const [address, setAddress] = useState('');
    const [gender, setGender] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [borderColor, setBorderColor] = useState('#ff97f7');

    async function Submit() {
        if (password !== confirmPassword) {
            setBorderColor('#f50202')
            return;
        }
        setBorderColor('#6df26d')
        const user = {
            login: login,
            password: password,
            firstName: firstName,
            lastName: lastName,
            birthday: new Date(birthday).toISOString(),
            address: address,
            gender: gender,
        }

        await fetch('http://localhost:3001/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
        })

        navigate('/SignIn');
    }

    return(
        <Section>
            <Header>Sign Up</Header>
            <form className="SignUpFormHeader">
                <Input type="text" id="fLogin" name="fLogin" className="SignUpFormLogin" placeholder="Login" value={login} onChange={event => setLogin(event.target.value)}/>
                <Input type="text" id="fFirstName" name="fFirstName" className="SignUpFormFirstName" placeholder="First Name" value={firstName} onChange={event => setFirstName(event.target.value)}/>
                <Input type="text" id="fLastName" name="fLastName" className="SignUpFormLastName" placeholder="Last Name" value={lastName} onChange={event => setLastName(event.target.value)}/>
                <Input type="date" id="fBirthday" name="fBirthday" className="SignUpFormBirthday" placeholder="Birthday" value={birthday} onChange={event => setBirthday(event.target.value)}/>
                <Input type="text" id="fAddress" name="fAddress" className="SignUpFormAddress" placeholder="Address" value={address} onChange={event => setAddress(event.target.value)}/>
                <Input type="text" id="fGender" name="fGender" className="SignUpFormGender" placeholder="Gender" value={gender} onChange={event => setGender(event.target.value)}/>
                <Input type="password" id="fPassword" name="fPassword" className="SignUpFormPassword" placeholder="Password" value={password} onChange={event => setPassword(event.target.value)}/>
                <Input type="password" id="fConfirmPassword" name="fConfirmPassword" className="SignUpFormConfirmPassword" placeholder="Confirm Password" value={confirmPassword} onChange={event => setConfirmPassword(event.target.value)} style={{borderColor}}/>
            </form>
            <Button type="submit" className="SignUpFormSubmit" onClick={Submit}>Sign Up {">"} </Button>
            <Paragraph>Already have an account? <Link to="/signIn">Sign In</Link></Paragraph>
        </Section>
    )
}

export default SignUpForm;