import styled from "styled-components";
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Table from "../../Table/Table";
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

const Label = styled.p`
  font-weight: lighter;
`

const AppointmentSection = styled.div`
  display: flex;
  flex-direction: row;
`
const CalendarSection = styled.div`
  margin: 2em 2em 2em 2em;
`

const TimeSection = styled.div`
  margin: 2em 2em 2em 2em;
`

const TimeSelect = styled.select`
  width: 10em;
  height: 2em;
  font-size: large;
  border: none;
  background-color: #aab3fd;
  color: #ffffff;
  border-radius: 0.5em;
`

const Timeslot = styled.option`
  margin: 0.2em;
  border: #aab3fd 0.1em solid;
  border-radius: 0.5em;
  background-color: #aab3fd;
  color: #ffffff;
  text-align: center;
  
  &:hover {
    border-color: #ff97f7;
    background-color: #ff97f7;
  }
`

const DoctorsSection = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2em 2em 2em 2em;
`

const SpecializationSelect = styled.select`
  width: 10em;
  height: 2em;
  font-size: large;
  border: none;
  background-color: #aab3fd;
  color: #ffffff;
  border-radius: 0.5em;
`

const DoctorSelect = styled.select`
  width: 10em;
  height: 2em;
  font-size: large;
  border: none;
  background-color: #aab3fd;
  color: #ffffff;
  border-radius: 0.5em;
`

const Option = styled.option`
  background-color: #aab3fd;
  color: #ffffff;
  text-align: center;
`

const Input = styled.input`
  width: 10em;
  height: 2em;
  background-color: #aab3fd;
  color: #ffffff;
  text-align: center;
  border: none;
  border-radius: 0.5em;
  font-size: large;
  
  &::-webkit-input-placeholder {
    color: #ffffff;
  }
`

const AddAppointmentButton = styled.button`
  margin: 5em 0em 0em 3.8em;
  width: 10em;
  height: 3em;
  background-color: #409cf0;
  color: #ffffff;
  text-align: center;
  border: none;
  border-radius: 0.5em;
  
  &:hover {
    background-color: #ff97f7;
  }
`

const PatientAppointmentsSection = styled.div`
  margin: 2em;
`

function PatientAppointmentsForm() {
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState('');
    const [tableData, setTableData] = useState(<></>);
    const [specializationsData, setSpecializationsData] = useState([]);
    const [doctorsData, setDoctorsData] = useState([]);
    const [doctorID, setDoctorID] = useState('');
    const [complaints, setComplaints] = useState('');
    const [timeSlots, setTimeSlots] = useState([]);

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
        <th>Date</th>
        <th>Cabinet</th>
        <th>Specialization</th>
        <th>Doctor last name</th>
    </tr>;

    useEffect(() => {
        getAllSpecializations().then();
    }, []);

    useEffect(() => {
        getAllPatientAppointments().then();
    });

    function chooseTime(e: any){
        if(e.target.value === 'SELECT') {
            return;
        }
        setTime(e.target.value);
    }

    async function chooseDoctor(e: any){
        if(e.target.value === 'SELECT') {
            return;
        }
        setDoctorID(e.target.value);
        await getDoctorFreeTime(e.target.value);
    }

    async function getDoctors(e: any) {
        if(e.target.value === 'SELECT') {
            setDoctorsData([]);
            return;
        }
        const response = await fetch(`http://localhost:3000/doctor/?specializationID=${e.target.id}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();

        const doctors = data.map((doctor: any, i:number) => (<Option key={i} value={doctor.id}>{doctor.firstname} {doctor.lastname}</Option>));
        setDoctorsData(doctors);
    }

    async function getAllSpecializations() {
        const response = await fetch("http://localhost:3000/specialization",{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();

        const specializations = data.map((specialization: any, i:number) => (<Option key={i} value={specialization.id}>{specialization.name}</Option>));
        setSpecializationsData(specializations);
    }

    async function getDoctorFreeTime(doctor: string) {
        const response = await fetch(`http://localhost:3000/doctor/${doctor}/${new Date(date).toISOString()}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();
        setTimeSlots(data);
    }

    async function deleteAppointment(event: any) {
        const response = await fetch(`http://localhost:3003/appointments/${event.value}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();

        const specializations = data.map((specialization: any, i:number) => (<Option key={i} value={specialization.id}>{specialization.name}</Option>));
        setSpecializationsData(specializations);
    }

    async function getAllPatientAppointments() {
        const response = await fetch(`http://localhost:3003/appointments/patient/${userData.id}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();

        const appointments = <>{data.map((row: any) => (
            <>
                <tr>
                    <th>{new Date(row.date).toLocaleString()}</th>
                    <th>{row.cabinet}</th>
                    <th>{row.specializationname}</th>
                    <th>{row.lastname}</th>
                </tr>
                <Menu menuButton={<MenuButton>Actions</MenuButton>}>
                    <MenuItem value={row.id} onClick={deleteAppointment}>Delete</MenuItem>
                </Menu>
            </>
        ))}</>;

        setTableData(appointments);
    }

    async function createAppointment(){
        const data = {
            date: new Date(`${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()} ${time}`).toISOString(),
            complaints: complaints,
            patientID: userData.id,
            doctorID: doctorID,
        }
        await fetch("http://localhost:3003/appointments",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });
    }

    return(
        <Section>
            <TopSection>
                <Paragraph>Make an appointment</Paragraph>
            </TopSection>
            <AppointmentSection>
                <CalendarSection>
                    <Label>Choose date</Label>
                    <Calendar value={date} onChange={setDate}/>
                </CalendarSection>
                <TimeSection>
                    <Label>Choose time</Label>
                    <TimeSelect onChange={chooseTime}>
                        <Timeslot>SELECT</Timeslot>
                        {timeSlots.map((slot, i: number) => (<Timeslot key={i} value={slot} onClick={chooseTime}>{slot}</Timeslot>))}
                    </TimeSelect>
                </TimeSection>
                <DoctorsSection>
                    <Label>Choose specialization</Label>
                    <SpecializationSelect onChange={getDoctors}>{<Option>SELECT</Option>}{specializationsData.map((specialization) => (specialization))}</SpecializationSelect>
                    <Label>Choose doctor</Label>
                    <DoctorSelect onChange={chooseDoctor}>{<Option>SELECT</Option>}{doctorsData.map((doctor) => (doctor))}</DoctorSelect>
                    <Label>Enter complaints</Label>
                    <Input value={complaints} placeholder={"Your complaints"} type={"text"} onChange={(event) => {setComplaints(event.target.value)}}></Input>
                    <AddAppointmentButton onClick={createAppointment}>Create appointment</AddAppointmentButton>
                </DoctorsSection>
                <PatientAppointmentsSection>
                    <Label>Your appointments</Label>
                    <Table columns={columns} data={tableData}></Table>
                </PatientAppointmentsSection>
            </AppointmentSection>
        </Section>
    )
}

export default PatientAppointmentsForm;