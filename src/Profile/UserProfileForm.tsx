import styled from "styled-components";
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import 'react-calendar/dist/Calendar.css';
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import Popup from "../PopUp/Popup";

const Section = styled.section`
  margin: 0em 1em 1em 1em;
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #ffffff;
  border-radius: 1em;
  height: 42em;
`

const TopSection = styled.section`
  display: flex;
  flex-direction: row;
  margin-left: 2em;
  margin-top: 2em;
`

const Paragraph = styled.p`
  font-weight: bolder;
`

const RowSection = styled.div`
  display: flex;
  flex-direction: row;
`

const Photo = styled.img`
  width: 10em;
  height: 10em;
  border-radius: 50%;
  margin: 1em ;
`

const Caption = styled.p`
  font-weight: lighter;
  font-size: 1.3em;
`

const UserFirstName = styled.p`
  margin-bottom: 0em;
  font-weight: bold;
  font-size: 1.3em;
  color: #434343;
`

const UserLastName = styled.p`
  margin-left: 1em;
  margin-bottom: 0em;
  font-weight: bold;
  font-size: 1.3em;
  color: #434343;
`

const UserRole = styled.p`
  margin-top: 2em;
  font-size: 1.3em;
  color: #434343;
`

const UserIntolerances = styled.p`
  font-size: 1.3em;
  color: #434343;
`

const UserHeight = styled.p`
  font-size: 1.3em;
  color: #434343;
`

const UserWeight = styled.p`
  font-size: 1.3em;
  color: #434343;
`

const UserBloodType = styled.p`
  font-size: 1.3em;
  color: #434343;
`

const NameSection = styled.section`
  margin: 0em;
  display: flex;
  flex-direction: row;
`

const CardSection = styled.section`
  margin-left: 0em;
  margin-top: 2em;
  display: flex;
  flex-direction: column;
`

const DataSection = styled.section`
  margin: 0em;
  display: flex;
  flex-direction: column;
`

const EditSection = styled.section`
  display: flex;
  flex-direction: column;
`

const EditUser = styled.button`
  margin-top: 5em;
  background-color: #aab3fd;
  border: none;
  border-radius: 1em;
  padding: 1em 2em 1em 2em;
  color: #ffffff;
  margin-left: 75em;
`

const EditIntolerance = styled.button`
  margin-top: 10em;
  background-color: #aab3fd;
  border: none;
  border-radius: 1em;
  padding: 1em 2em 1em 2em;
  color: #ffffff;
  margin-left: 75em;
`

const ExitButton = styled.button`
  margin-top: 15em;
  background-color: #ff0000;
  border: none;
  border-radius: 1em;
  padding: 1em 2em 1em 2em;
  color: #ffffff;
  margin-left: 75em;
`

const EditProfilesFirstNameInput = styled.input`
  box-sizing: border-box;
  padding: 1em;
  margin-top: 1em;
  width: 38em;
  border-radius: 1em;
  border-width: 0.2em;
  border-color: #ff97f7;

  &:hover {
    border-color: #97ffdb;
  }
`

const EditProfileLastNameInput = styled.input`
  box-sizing: border-box;
  padding: 1em;
  margin-top: 1em;
  width: 38em;
  border-radius: 1em;
  border-width: 0.2em;
  border-color: #ff97f7;

  &:hover {
    border-color: #97ffdb;
  }
`

const EditProfileCaption = styled.p`
    font-weight: bolder;
`

const EditProfileButton = styled.button`
  margin-top: 2em;
  height: 3em;
  margin-left: 30em;
  border-radius: 1em;
  background-color: #aab3fd;
  color: #ffffff;
  border: none;

  &:hover {
    background-color: #ff97f7;
  }
`

const EditCardHeightInput = styled.input`
  box-sizing: border-box;
  padding: 1em;
  margin-top: 1em;
  width: 38em;
  border-radius: 1em;
  border-width: 0.2em;
  border-color: #ff97f7;

  &:hover {
    border-color: #97ffdb;
  }
`

const EditCardWeightInput = styled.input`
  box-sizing: border-box;
  padding: 1em;
  margin-top: 1em;
  width: 38em;
  border-radius: 1em;
  border-width: 0.2em;
  border-color: #ff97f7;

  &:hover {
    border-color: #97ffdb;
  }
`

const EditCardIntoleranceInput = styled.input`
  box-sizing: border-box;
  padding: 1em;
  margin-top: 1em;
  width: 38em;
  border-radius: 1em;
  border-width: 0.2em;
  border-color: #ff97f7;

  &:hover {
    border-color: #97ffdb;
  }
`

const EditCardBloodyTypeInput = styled.input`
  box-sizing: border-box;
  padding: 1em;
  margin-top: 1em;
  width: 38em;
  border-radius: 1em;
  border-width: 0.2em;
  border-color: #ff97f7;

  &:hover {
    border-color: #97ffdb;
  }
`

const EditCardCaption = styled.p`
    font-weight: bolder;
`

const EditCardButton = styled.button`
  margin-top: 2em;
  height: 3em;
  margin-left: 30em;
  border-radius: 1em;
  background-color: #aab3fd;
  color: #ffffff;
  border: none;

  &:hover {
    background-color: #ff97f7;
  }
`

function UserProfileForm() {

    let navigate = useNavigate();
    const [userModalActive, setUserModalActive] = useState(false);
    const [cardModalActive, setCardModalActive] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [role, setRole] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [intolerances, setIntolerances] = useState('');
    const [bloodType, setBloodType] = useState('');

    const token = localStorage.getItem("token");

    if(!token) {
        navigate('/SignIn');
    }

    const userDataJSON = localStorage.getItem("userData");

    if(!userDataJSON) {
        navigate('/SignIn');
    }
    // @ts-ignore
    const userData = JSON.parse(userDataJSON);

    const photo = userData.photo;

    useEffect(() => {
        getMyProfile().then();
        getMyCard().then();
    }, []);

    async function getMyProfile() {
        const response = await fetch('http://localhost:3000/user/me', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();
        setFirstName(data.firstname);
        setLastName(data.lastname);
        setRole(data.role);
    }

    async function getMyCard() {
        const response = await fetch('http://localhost:3002/cards', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();
        setIntolerances(data.intolerances);
        setHeight(data.height);
        setWeight(data.weight);
        setBloodType(data.bloodyType);
    }

    async function userEdit() {
        const body = {
            firstName: firstName,
            lastName: lastName,
        }
        await fetch(`http://localhost:3000/user/me`,{
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(body),
        });
        setUserModalActive(false);
        await getMyProfile();
    }

    async function cardEdit() {
        const body = {
            intolerances: intolerances,
            height: height,
            weight: weight,
            bloodType: bloodType,
        }
        await fetch(`http://localhost:3002/cards`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(body),
        });
        setCardModalActive(false);
        await getMyCard();
    }

    return(
        <Section>
            <TopSection>
                <Paragraph>Profile</Paragraph>
            </TopSection>
            <RowSection>
                <Photo src={'http://' + photo}></Photo>
                <DataSection>
                    <NameSection>
                        <UserFirstName>{firstName}</UserFirstName>
                        <UserLastName>{lastName}</UserLastName>
                    </NameSection>
                    <UserRole>{role}</UserRole>
                    <CardSection>
                        <RowSection>
                            <Caption>Intolerances: </Caption>
                            <UserIntolerances>{intolerances}</UserIntolerances>
                        </RowSection>
                        <RowSection>
                            <Caption>Height: </Caption>
                            <UserHeight>{height}</UserHeight>
                        </RowSection>
                        <RowSection>
                            <Caption>Weight: </Caption>
                            <UserWeight>{weight}</UserWeight>
                        </RowSection>
                        <RowSection>
                            <Caption>Blood Type: </Caption>
                            <UserBloodType>{bloodType}</UserBloodType>
                        </RowSection>
                    </CardSection>
                </DataSection>
                <EditSection>
                    <EditUser onClick={() => setUserModalActive(true)}>Edit</EditUser>
                    <EditIntolerance onClick={() => setCardModalActive(true)}>Edit</EditIntolerance>
                    <ExitButton onClick={() => {navigate('/SignIn');}}>Exit</ExitButton>
                </EditSection>
            </RowSection>
            <Popup active={userModalActive} setActive={setUserModalActive}>
                <EditProfileCaption>Edit profile</EditProfileCaption>
                <EditProfilesFirstNameInput onChange={event => setFirstName(event.target.value)} defaultValue={firstName}></EditProfilesFirstNameInput>
                <EditProfileLastNameInput onChange={event => setLastName(event.target.value)} defaultValue={lastName}></EditProfileLastNameInput>
                <EditProfileButton onClick={userEdit}>Edit</EditProfileButton>
            </Popup>
            <Popup active={cardModalActive} setActive={setCardModalActive}>
                <EditCardCaption>Edit card</EditCardCaption>
                <EditCardIntoleranceInput onChange={event => setIntolerances(event.target.value)} defaultValue={intolerances}></EditCardIntoleranceInput>
                <EditCardHeightInput onChange={event => setHeight(event.target.value)} defaultValue={height}></EditCardHeightInput>
                <EditCardWeightInput onChange={event => setWeight(event.target.value)} defaultValue={weight}></EditCardWeightInput>
                <EditCardBloodyTypeInput onChange={event => setBloodType(event.target.value)} defaultValue={bloodType}></EditCardBloodyTypeInput>
                <EditCardButton onClick={cardEdit}>Save</EditCardButton>
            </Popup>
        </Section>
    )
}

export default UserProfileForm;