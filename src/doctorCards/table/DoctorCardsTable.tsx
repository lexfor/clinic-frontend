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

const PatientSection = styled.section`
  display: flex;
  flex-direction: column;
  margin-left: 2em;
  margin-top: 2em;
`

const RowSection = styled.section`
  display: flex;
  flex-direction: row;
`

const Paragraph = styled.p`
  font-weight: bolder;
`

const Label = styled.p`
  margin-left: 65em;
  padding-top: 0.5em;
  font-weight: lighter;
  
`

const Search = styled.button`
  padding: 1em 2em;
  border: none;
  border-radius: 1em;
  font-weight: lighter;
  outline: none;
  background-color: #aab3fd;
  color: #ffffff;

  &:hover {
    background-color: #ff97f7;
  }
`

const PatientSearch = styled.input`
  max-height: 2em;
  max-width: 8em;
  margin-top: 1.5em;
  font-weight: lighter;
  border: 0.1em solid;
  border-radius: 1em;
  outline: none;
  margin-left: 1em;
`

const PatientData = styled.p`
  margin-left: 1em;
`

function DoctorCardsTable() {

    const [tableData, setTableData] = useState(<></>);

    const [searchName, setSearchName] = useState('');

    const [patientName, setPatientName] = useState('');

    const [searchResults, setSearchResults] = useState([]);

    const [birthday, setBirthday] = useState('');

    const [intolerances, setIntolerances] = useState('');

    const [height, setHeight] = useState('');

    const [weight, setWeight] = useState('');

    const [blood, setBlood] = useState('');

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
        <th>Appointment complaints</th>
        <th>Diagnosis</th>
        <th>Purpose</th>
    </tr>;

    useEffect(() => {
        findUserData(searchName).then();
    }, [searchName]);

    async function getData(id: string) {
        const response = await fetch(`http://localhost:3002/cards/patient/${id}/full`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();

        const resolutions = <>{data.resolution_data.map((row: any) => (
            <>
                <tr>
                    <th>{row.first_name}</th>
                    <th>{row.last_name}</th>
                    <th>{new Date(row.date).toLocaleString()}</th>
                    <th>{row.complaints}</th>
                    <th>{row.diagnosis}</th>
                    <th>{row.purpose}</th>
                </tr>
            </>
        ))}</>;
        setPatientName(`${data.first_name} ${data.last_name}`)
        setBirthday(new Date(data.birthday).toLocaleString());
        setHeight(data.height);
        setWeight(data.weight);
        setBlood(data.blood_type);
        setIntolerances(data.intolerances);
        setTableData(resolutions);
    }

    async function findUserData(name: string) {
        const response = await fetch(`http://localhost:3000/user?name=${name}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();
        setSearchResults(data);
    }

    return(
        <Section>
            <TopSection>
                <Paragraph>Card</Paragraph>
                <Label>Patient name</Label>
                <PatientSearch value={searchName} onChange={event => setSearchName(event.target.value)} placeholder="Search"/>
                <ul>
                    {searchResults.map((item: any) => (
                        <Search value={item.id} onClick={event => getData((event.target as HTMLTextAreaElement).value)}>{item.firstName} {item.lastName} </Search>
                    ))}
                </ul>
            </TopSection>
            <PatientSection>
                <RowSection>
                    <Paragraph>Patient name:</Paragraph>
                    <PatientData>{patientName}</PatientData>
                </RowSection>
                <RowSection>
                    <Paragraph>Birthday: </Paragraph>
                    <PatientData>{birthday}</PatientData>
                </RowSection>
                <RowSection>
                    <Paragraph>Height: </Paragraph>
                    <PatientData>{height}</PatientData>
                </RowSection>
                <RowSection>
                    <Paragraph>Weight: </Paragraph>
                    <PatientData>{weight}</PatientData>
                </RowSection>
                <RowSection>
                    <Paragraph>Intolerances: </Paragraph>
                    <PatientData>{intolerances}</PatientData>
                </RowSection>
                <RowSection>
                    <Paragraph>Blood type: </Paragraph>
                    <PatientData>{blood}</PatientData>
                </RowSection>
            </PatientSection>
            <Table columns={columns} data={tableData}/>
        </Section>
    )
}

export default DoctorCardsTable;