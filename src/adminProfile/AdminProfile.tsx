import styled from "styled-components";
import ClinicLogo from "../clinic-logo.png";
import {useNavigate} from "react-router-dom";
import UserProfileForm from "../Profile/UserProfileForm";

const Header = styled.header`
  display: flex;
  flex-direction: row;
`

const ClinicName = styled.p`
  font-weight: bold;
  font-size: 1.3em;
  color: #434343;
`

const Logo = styled.img`
  width: 2.5em;
  height: 2.5em;
  border-radius: 50%;
  margin: 1em ;
`

const UserName = styled.p`
  flex-grow: 1;
  text-align: right;
  margin-right: 1em;
  font-weight: bold;
  font-size: 1.3em;
  color: #434343;
`

const UserPhoto = styled.img`
  width: 2.5em;
  height: 2.5em;
  border-radius: 50%;
  margin: 1em ;
`

const Section = styled.section`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #aab3fd;
`

const DoctorButton = styled.button`
  margin: 1em 0.1em 1em 19em;
  padding: 1em 4em 1em 4em;
  border: none;
  border-radius: 1em;
  font-weight: bold;
  color: #409cf0;

  &:hover {
    background-color: #ff97f7;
    color: #ffffff;
  }
`

const PatientButton = styled.button`
  margin: 1em 0.1em 1em 1em;
  padding: 1em 4em 1em 4em;
  border: none;
  border-radius: 1em;
  font-weight: bold;
  color: #409cf0;

  &:hover {
    background-color: #ff97f7;
    color: #ffffff;
  }
`

const SpecializationButton = styled.button`
  margin: 1em 0.1em 1em 1em;
  padding: 1em 4em 1em 4em;
  border: none;
  border-radius: 1em;
  font-weight: bold;
  color: #409cf0;

  &:hover {
    background-color: #ff97f7;
    color: #ffffff;
  }
`

function AdminProfile() {

    let navigate = useNavigate();
    const doctorRedirect = () => {
        let path = `/admin/doctors`;
        navigate(path);
    }

    const patientRedirect = () => {
        let path = `/admin/patients`;
        navigate(path);
    }

    const specializationsRedirect = () => {
        let path = `/admin/specializations`;
        navigate(path);
    }

    const userDataJSON = localStorage.getItem("userData");

    if(!userDataJSON) {
        navigate('/SignIn');
    }

    // @ts-ignore
    const userData = JSON.parse(userDataJSON);

    console.log(userData);

    const name = `${userData.firstname} ${userData.lastname}`;
    const photo = userData.photo;


    return(
        <Section>
            <Header>
                <Logo src={ClinicLogo}></Logo>
                <ClinicName>Clinic Name</ClinicName>
                <DoctorButton onClick={doctorRedirect}>Doctors</DoctorButton>
                <PatientButton onClick={patientRedirect}>Patients</PatientButton>
                <SpecializationButton onClick={specializationsRedirect}>Specializations</SpecializationButton>
                <UserName>{name}</UserName>
                <a href={'/profile/admin'}><UserPhoto src={'http://' + photo}></UserPhoto></a>
            </Header>
            <UserProfileForm />
        </Section>
    )
}

export default AdminProfile;