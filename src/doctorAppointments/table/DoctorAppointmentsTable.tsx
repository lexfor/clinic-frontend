import styled from "styled-components";
import SearchLogo from "../../search-logo.png";
import Popup from "../../PopUp/Popup";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Table from "../../Table/Table";
import {MenuItem, Menu, MenuButton} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';

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

const Search = styled.input`
  max-height: 2em;
  max-width: 8em;
  margin-top: 1.5em;
  border: none;
  font-weight: lighter;
  outline: none;
`

const Logo = styled.img`
  width: 1em;
  height: 1em;
  margin: 1.6em 0.5em 0em 70em;
`

const AddResolutionDiagnosisInput = styled.input`
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

const AddResolutionPurposeInput = styled.input`
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

const Caption = styled.p`
    font-weight: bolder;
`

const AddResolutionButton = styled.button`
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

function DoctorAppointmentsTable() {

    const [modalActive, setModalActive] = useState(false);

    const [tableData, setTableData] = useState(<></>);

    const [diagnosis, setDiagnosis] = useState('');

    const [purpose, setPurpose] = useState('');

    const [appointmentID, setAppointmentID] = useState('');

    let navigate = useNavigate();

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

    const columns = <tr>
        <th>First name</th>
        <th>Last name</th>
        <th>Appointment date</th>
        <th>Complaints</th>
        <th>Intolerances</th>
    </tr>;

    useEffect(() => {
        updateData().then();
    });

    async function updateData() {
        const response = await fetch(`http://localhost:3003/appointments/doctor/${userData.id}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();

        const appointments = <>{data.map((row: any) => (
            <>
                <tr>{}
                    <th>{row.firstname}</th>
                    <th>{row.lastname}</th>
                    <th>{new Date(row.date).toLocaleString()}</th>
                    <th>{row.complaints}</th>
                    <th>{row.intolerances}</th>
                </tr>
                <Menu menuButton={<MenuButton>Actions</MenuButton>}>
                    <MenuItem value={row.id} onClick={() => {setModalActive(true); setAppointmentID(row.id);}}>Add resolution</MenuItem>
                </Menu>
            </>
        ))}</>;

        setTableData(appointments);
    }

    async function AddResolution() {
        const body = {
            diagnosis: diagnosis,
            purpose: purpose,
            appointmentID: appointmentID,
        };
        await fetch(`http://localhost:3004/resolutions`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(body),
        });
        setModalActive(false);
    }

    return(
        <Section>
            <TopSection>
                <Paragraph>Appointments</Paragraph>
                <Logo src={SearchLogo}></Logo>
                <Search placeholder={"Search"}></Search>
            </TopSection>
            <Popup active={modalActive} setActive={setModalActive}>
                <Caption>Diagnosis</Caption>
                <AddResolutionDiagnosisInput onChange={event => setDiagnosis(event.target.value)}></AddResolutionDiagnosisInput>
                <Caption>Purpose</Caption>
                <AddResolutionPurposeInput onChange={event => setPurpose(event.target.value)}></AddResolutionPurposeInput>
                <AddResolutionButton onClick={AddResolution}>Add</AddResolutionButton>
            </Popup>
            <Table columns={columns} data={tableData}></Table>
        </Section>
    )
}

export default DoctorAppointmentsTable;