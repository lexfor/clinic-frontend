import styled from "styled-components";
import ClinicLogo from "../clinic-logo.png";
import {useNavigate} from "react-router-dom";
import PatientResolutionsTable from "./form/PatientResolutionsTable";

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

const PatientName = styled.p`
  flex-grow: 1;
  text-align: right;
  margin-right: 1em;
  font-weight: bold;
  font-size: 1.3em;
  color: #434343;
`

const PatientPhoto = styled.img`
  width: 2.5em;
  height: 2.5em;
  border-radius: 50%;
  margin: 1em ;
`

const ResolutionsButton = styled.button`
  margin: 1em 0.1em 1em 28em;
  padding: 1em 4em 1em 4em;
  border: none;
  border-radius: 1em;
  font-weight: bold;
  background-color: #ff97f7;
  color: #ffffff;
`

const AppointmentsButton = styled.button`
  margin: 1em 0.1em 1em 1em;
  padding: 1em 4em 1em 4em;
  border: none;
  border-radius: 1em;
  font-weight: bold;
  color:  #aab3fd;

  &:hover {
    background-color: #ff97f7;
    color: #ffffff;
  }
`

const Section = styled.section`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #aab3fd;
`

function PatientResolutions() {

    let navigate = useNavigate();
    const resolutionsRedirect = () => {
        let path = `/patients/resolutions`;
        navigate(path);
    }

    const appointmentsRedirect = () => {
        let path = `/patients/appointments`;
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
                <ResolutionsButton onClick={resolutionsRedirect}>Resolutions</ResolutionsButton>
                <AppointmentsButton onClick={appointmentsRedirect}>Appointments</AppointmentsButton>
                <PatientName>{name}</PatientName>
                <a href={'/profile/patient'}><PatientPhoto src={'http://' + photo}></PatientPhoto></a>
            </Header>
            <PatientResolutionsTable/>
        </Section>
    )
}

export default PatientResolutions;