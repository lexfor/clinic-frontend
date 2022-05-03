import styled from "styled-components";
import SearchLogo from "../../search-logo.png";
import {useEffect, useState} from "react";
import Popup from "../../PopUp/Popup";
import Scrollbar from "react-scrollbars-custom";
import {useNavigate} from "react-router-dom";
import {Menu, MenuButton, MenuItem} from "@szhsin/react-menu";
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
  margin: 1.6em 0.5em 0em 65em;
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

const AddDoctorInput = styled.input`
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

const AddDoctorCaption = styled.p`
    font-weight: bolder;
`

const AddDoctorButton = styled.button`
  margin-top: 2em;
  height: 3em;
  width: 8em;
  margin-left: 30em;
  border-radius: 1em;
  background-color: #aab3fd;
  color: #ffffff;
  border: none;

  &:hover {
    background-color: #ff97f7;
  }
`

const SpecializationSelect = styled.select`
  margin-top: 2em;
  margin-left: 0.9em;
  text-align: center;
  height: 3em;
  width: 30em;
  border-radius: 1em;
  color: #aab3fd;
  background-color: #ffffff;
  border-color: #aab3fd;
  font-size: medium;
  
  & > option {
    height: 3em;
    background-color: #aab3fd;
    color: #ffffff;
  }

  & > option:hover {
    height: 3em;
    background-color: #ff97f7;
    color: #ffffff;
  }
`

function AdminDoctorsTable() {

    const [tableData, setTableData] = useState(<></>);

    const [addActive, setAddActive] = useState(false);

    const [updateActive, setUpdateActive] = useState(false);

    const [login, setLogin] = useState('');

    const [password, setPassword] = useState('');

    const [firstName, setFirstName] = useState('');

    const [lastName, setLastName] = useState('');

    const [birthday, setBirthday] = useState('');

    const [address, setAddress] = useState('');

    const [gender, setGender] = useState('');

    const [cabinet, setCabinet] = useState('');

    const [position, setPosition] = useState('');

    const [specializationID, setSpecializationID] = useState('');

    const [specializations, setSpecializations] = useState(<></>);

    let navigate = useNavigate();

    const token = localStorage.getItem("token");

    if(!token) {
        navigate('/SignIn');
    }

    const columns = <tr>
        <th>First name</th>
        <th>Last name</th>
        <th>Cabinet</th>
        <th>Position</th>
        <th>Specialization name</th>
    </tr>;

    useEffect(() => {
        updateData().then();
    });

    async function addDoctor(){
        await fetch('http://localhost:3001/auth/admin/register/doctor', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                login: login,
                password: password,
                firstName: firstName,
                lastName: lastName,
                birthday: birthday,
                address: address,
                gender: gender,
                cabinet: cabinet,
                position: position,
                specializationID: specializationID,
            })
        });
        setAddActive(false);
        await updateData();
    }

    async function updateDoctor(){
        await fetch(`http://localhost:3000/doctor/${localStorage.getItem('updateDoctorID')}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                birthday: birthday,
                address: address,
                gender: gender,
                cabinet: cabinet,
                position: position,
                specializationID: specializationID,
            })
        });
        setUpdateActive(false);
    }

    async function getAllSpecializations(){
        const response = await fetch('http://localhost:3000/specialization', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();

        const specializationsOptions = <SpecializationSelect onChange={(e) => {
            setSpecializationID(e.target.value);
        }
        }>{data.map((specialization: any) => (
            <option value={specialization.id}>{specialization.name}</option>
        ))}
            <option selected value={''} disabled hidden>select specialization</option>
        </SpecializationSelect>
        setSpecializations(specializationsOptions);
    }

    async function updateData() {
        const response = await fetch("http://localhost:3000/doctor",{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();

        const doctors = <>{data.map((row: any) => (
            <>
                <tr>
                    <th>{row.firstname}</th>
                    <th>{row.lastname}</th>
                    <th>{row.cabinet}</th>
                    <th>{row.position}</th>
                    <th>{row.specializationname}</th>
                </tr>
                <Menu menuButton={<MenuButton>Actions</MenuButton>}>
                    <MenuItem value={row.id} onClick={Delete}>Delete</MenuItem>
                    <MenuItem value={row.id} onClick={OpenUpdate}>Update</MenuItem>
                </Menu>
            </>
        ))}</>;

        setTableData(doctors);
    }

    async function Delete(event: any) {
        await fetch(`http://localhost:3000/doctor/${event.value}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        await updateData();
    }

    async function OpenAdd() {
        await getAllSpecializations();
        setAddActive(true);
    }

    async function OpenUpdate(event: any) {
        const response = await fetch(`http://localhost:3000/doctor/${event.value}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();

        const trueDate = new Date(data.birthday).toLocaleDateString();

        let month: string;

        if(new Date(trueDate).getMonth() + 1 < 10) {
            month = `0${new Date(trueDate).getMonth() + 1}`;
        } else {
            month = `${new Date(trueDate).getMonth() + 1}`;
        }

        setFirstName(data.firstname);
        setLastName(data.lastname);
        setBirthday(`${new Date(trueDate).getFullYear()}-${month}-${new Date(trueDate).getDate()}`);
        setGender(data.gender);
        setAddress(data.address);
        setCabinet(data.cabinet);
        setPosition(data.position);

        localStorage.setItem('updateDoctorID', event.value);
        await getAllSpecializations();
        setUpdateActive(true);
    }

    return(
        <Section>
            <TopSection>
                <Paragraph>Doctors</Paragraph>
                <Logo src={SearchLogo}></Logo>
                <Search placeholder={"Search"}></Search>
                <AddButton onClick={OpenAdd}>Add Doctor</AddButton>
            </TopSection>
            <Popup active={addActive} setActive={setAddActive}>
                <Scrollbar style={{ width: 540, height: 300}}>
                    <AddDoctorCaption>login</AddDoctorCaption>
                    <AddDoctorInput onChange={event => setLogin(event.target.value)}></AddDoctorInput>
                    <AddDoctorCaption>password</AddDoctorCaption>
                    <AddDoctorInput type={'password'} onChange={event => setPassword(event.target.value)}></AddDoctorInput>
                    <AddDoctorCaption>first name</AddDoctorCaption>
                    <AddDoctorInput onChange={event => setFirstName(event.target.value)}></AddDoctorInput>
                    <AddDoctorCaption>last name</AddDoctorCaption>
                    <AddDoctorInput onChange={event => setLastName(event.target.value)}></AddDoctorInput>
                    <AddDoctorCaption>birthday</AddDoctorCaption>
                    <AddDoctorInput type={"date"} onChange={event => setBirthday(event.target.value)}></AddDoctorInput>
                    <AddDoctorCaption>address</AddDoctorCaption>
                    <AddDoctorInput onChange={event => setAddress(event.target.value)}></AddDoctorInput>
                    <AddDoctorCaption>gender</AddDoctorCaption>
                    <AddDoctorInput onChange={event => setGender(event.target.value)}></AddDoctorInput>
                    <AddDoctorCaption>cabinet</AddDoctorCaption>
                    <AddDoctorInput onChange={event => setCabinet(event.target.value)}></AddDoctorInput>
                    <AddDoctorCaption>position</AddDoctorCaption>
                    <AddDoctorInput onChange={event => setPosition(event.target.value)}></AddDoctorInput>
                    <AddDoctorCaption>specialization</AddDoctorCaption>
                    {specializations}
                    <AddDoctorButton onClick={addDoctor}>Add</AddDoctorButton>
                </Scrollbar>
            </Popup>
            <Popup active={updateActive} setActive={setUpdateActive}>
                <Scrollbar style={{ width: 540, height: 300}}>
                    <AddDoctorCaption>first name</AddDoctorCaption>
                    <AddDoctorInput defaultValue={firstName} onChange={event => setFirstName(event.target.value)}></AddDoctorInput>
                    <AddDoctorCaption>last name</AddDoctorCaption>
                    <AddDoctorInput defaultValue={lastName} onChange={event => setLastName(event.target.value)}></AddDoctorInput>
                    <AddDoctorCaption>birthday</AddDoctorCaption>
                    <AddDoctorInput defaultValue={birthday} type={"date"} onChange={event => setBirthday(event.target.value)}></AddDoctorInput>
                    <AddDoctorCaption>address</AddDoctorCaption>
                    <AddDoctorInput defaultValue={address} onChange={event => setAddress(event.target.value)}></AddDoctorInput>
                    <AddDoctorCaption>gender</AddDoctorCaption>
                    <AddDoctorInput defaultValue={gender} onChange={event => setGender(event.target.value)}></AddDoctorInput>
                    <AddDoctorCaption>cabinet</AddDoctorCaption>
                    <AddDoctorInput defaultValue={cabinet} onChange={event => setCabinet(event.target.value)}></AddDoctorInput>
                    <AddDoctorCaption>position</AddDoctorCaption>
                    <AddDoctorInput defaultValue={position} onChange={event => setPosition(event.target.value)}></AddDoctorInput>
                    <AddDoctorCaption>specialization</AddDoctorCaption>
                    {specializations}
                    <AddDoctorButton onClick={updateDoctor}>Add</AddDoctorButton>
                </Scrollbar>
            </Popup>
            <Table columns={columns} data={tableData}></Table>
        </Section>
    )
}

export default AdminDoctorsTable;