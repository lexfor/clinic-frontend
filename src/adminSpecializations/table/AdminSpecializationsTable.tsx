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
  margin: 1.6em 0.5em 0em 60em;
`

const AddButton = styled.button`
  max-height: 3em;
  max-width: 9in;
  margin-top: 1.1em;
  border-radius: 1em;
  background-color: #aab3fd;
  color: #ffffff;
  border: none;

  &:hover {
    background-color: #ff97f7;
  }
`

const AddSpecializationInput = styled.input`
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

const AddSpecializationCaption = styled.p`
    font-weight: bolder;
`

const AddSpecializationButton = styled.button`
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

function AdminSpecializationsTable() {

    const [modalActive, setModalActive] = useState(false);

    const [tableData, setTableData] = useState(<></>);

    const [specializationName, setSpecializationName] = useState('');

    let navigate = useNavigate();

    const token = localStorage.getItem("token");

    if(!token) {
        navigate('/SignIn');
    }

    const columns = <tr>
        <th>Specializations name</th>
        <th>ID</th>
    </tr>;

    useEffect(() => {
        updateData().then();
    });

    async function addSpecialization() {

        await fetch('http://localhost:3000/specialization', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({name: specializationName}),
        });

        setModalActive(false);

        await updateData();
    }

    async function updateData() {
        const response = await fetch("http://localhost:3000/specialization",{
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
                    <th>{row.name}</th>
                    <th>{row.id}</th>
                </tr>
                <Menu menuButton={<MenuButton>Actions</MenuButton>}>
                    <MenuItem value={row.id} onClick={Delete}>Delete</MenuItem>
                </Menu>
            </>
        ))}</>;

        setTableData(specializations);
    }

    async function Delete(event: any) {
        await fetch(`http://localhost:3000/specialization/${event.value}`,{
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
                <Paragraph>Specializations</Paragraph>
                <Logo src={SearchLogo}></Logo>
                <Search placeholder={"Search"}></Search>
                <AddButton onClick={() => setModalActive(true)}>Add Specialization</AddButton>
            </TopSection>
            <Popup active={modalActive} setActive={setModalActive}>
                <AddSpecializationCaption>New specialization name</AddSpecializationCaption>
                <AddSpecializationInput onChange={event => setSpecializationName(event.target.value)}></AddSpecializationInput>
                <AddSpecializationButton onClick={addSpecialization}>Add</AddSpecializationButton>
            </Popup>
            <Table columns={columns} data={tableData}></Table>
        </Section>
    )
}

export default AdminSpecializationsTable;