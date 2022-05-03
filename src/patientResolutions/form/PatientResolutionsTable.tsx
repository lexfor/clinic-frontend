import styled from "styled-components";
import SearchLogo from "../../search-logo.png";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Table from "../../Table/Table";
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
  margin: 1.6em 0.5em 0em 75em;
`

function AdminSpecializationsTable() {

    const [tableData, setTableData] = useState(<></>);

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
        <th>Appointment date</th>
        <th>Diagnosis</th>
        <th>Doctor purpose</th>
        <th>Doctor specialization</th>
    </tr>;

    useEffect(() => {
        updateData().then();
    });

    async function updateData() {
        const response = await fetch(`http://localhost:3004/resolutions/patient/${userData.id}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();

        const resolutions = <>{data.map((row: any) => (
            <>
                <tr>
                    <th>{new Date(row.date).toLocaleString()}</th>
                    <th>{row.diagnosis}</th>
                    <th>{row.purpose}</th>
                    <th>{row.specialization}</th>
                </tr>
            </>
        ))}</>;

        setTableData(resolutions);
    }

    return(
        <Section>
            <TopSection>
                <Paragraph>Resolutions</Paragraph>
                <Logo src={SearchLogo}></Logo>
                <Search placeholder={"Search"}></Search>
            </TopSection>
            <Table columns={columns} data={tableData}></Table>
        </Section>
    )
}

export default AdminSpecializationsTable;