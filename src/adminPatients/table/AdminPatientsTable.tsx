import styled from "styled-components";
import SearchLogo from "../../search-logo.png";
import Table from "../../Table/Table";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Menu, MenuButton, MenuItem} from "@szhsin/react-menu";

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

function AdminPatientsTable() {

    const [tableData, setTableData] = useState(<></>);

    let navigate = useNavigate();

    const token = localStorage.getItem("token");

    if(!token) {
        navigate('/SignIn');
    }

    const columns = <tr>
        <th>First name</th>
        <th>Last name</th>
        <th>gender</th>
        <th>Address</th>
        <th>Birthday</th>
    </tr>;

    useEffect(() => {
        updateData().then();
    });

    async function updateData() {
        const response = await fetch("http://localhost:3000/patient",{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();

        const specializations = <>{data.map((row: any) => (
            <>
                <tr>
                    <th>{row.firstname}</th>
                    <th>{row.lastname}</th>
                    <th>{row.gender}</th>
                    <th>{row.address}</th>
                    <th>{new Date(row.birthday).toLocaleDateString()}</th>
                </tr>
                <Menu menuButton={<MenuButton>Actions</MenuButton>}>
                    <MenuItem value={row.id} onClick={Delete}>Delete</MenuItem>
                </Menu>
            </>
        ))}</>;

        setTableData(specializations);
    }

    async function Delete(event: any) {
        await fetch(`http://localhost:3000/patient/${event.value}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        await updateData();
    }

    return(
        <Section>
            <TopSection>
                <Paragraph>Patients</Paragraph>
                <Logo src={SearchLogo}></Logo>
                <Search placeholder={"Search"}></Search>
            </TopSection>
            <Table columns={columns} data={tableData}></Table>
        </Section>
    )
}

export default AdminPatientsTable;