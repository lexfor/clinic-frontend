import styled from "styled-components";
import ClinicLogo from "../clinic-logo.png";
import {useNavigate} from "react-router-dom";
import DoctorAppointmentsTable from "./table/DoctorAppointmentsTable";

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

const DoctorName = styled.p`
  flex-grow: 1;
  text-align: right;
  margin-right: 1em;
  font-weight: bold;
  font-size: 1.3em;
  color: #434343;
`

const DoctorPhoto = styled.img`
  width: 2.5em;
  height: 2.5em;
  border-radius: 50%;
  margin: 1em ;
`

const ResolutionButton = styled.button`
  margin: 1em 0.1em 1em 20em;
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

const AppointmentButton = styled.button`
  margin: 1em 0.1em 1em 1em;
  padding: 1em 4em 1em 4em;
  border: none;
  border-radius: 1em;
  font-weight: bold;
  background-color: #ff97f7;
  color: #ffffff;
`

const CardsButton = styled.button`
  margin: 1em 0.1em 1em 1em;
  padding:1em 6em 1em 6em;
  border: none;
  border-radius: 1em;
  font-weight: bold;
  color: #409cf0;

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

function DoctorAppointments() {

    let navigate = useNavigate();

    const doctorResolutionsRedirect = () => {
        let path = `/doctors/resolutions`;
        navigate(path);
    }


    const doctorAppointmentsRedirect = () => {
        let path = `/doctors/appointments`;
        navigate(path);
    }

    const doctorCardsRedirect = () => {
        let path = `/doctors/cards`;
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
                <ResolutionButton onClick={doctorResolutionsRedirect}>Resolutions</ResolutionButton>
                <AppointmentButton onClick={doctorAppointmentsRedirect}>Appointments</AppointmentButton>
                <CardsButton onClick={doctorCardsRedirect}>Cards</CardsButton>
                <DoctorName>{name}</DoctorName>
                <a href={'/profile/doctor'}><DoctorPhoto src={'http://' + photo}></DoctorPhoto></a>
            </Header>
            <DoctorAppointmentsTable />
        </Section>
    )
}

export default DoctorAppointments;