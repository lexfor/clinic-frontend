import React from 'react';
import './App.css';
import SignUp from "./signUp/SignUp";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import SignIn from "./signIn/SignIn";
import AdminPatients from "./adminPatients/AdminPatients";
import NotFound from "./notFound/NotFound";
import AdminDoctors from "./adminDoctors/AdminDoctors";
import AdminSpecializations from "./adminSpecializations/AdminSpecializations";
import PatientAppointments from "./patientAppointments/PatientAppointments";
import PatientResolutions from "./patientResolutions/PatientResolutions";
import DoctorAppointments from "./doctorAppointments/DoctorAppointments";
import DoctorResolutions from "./doctorResolutions/DoctorResolutions";
import PatientProfile from "./patientProfile/PatientProfile";
import DoctorProfile from "./doctorProfile/DoctorProfile";
import DoctorCards from "./doctorCards/DoctorCards";
import AdminProfile from "./adminProfile/AdminProfile";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/signUp" element={<SignUp/>}>
          </Route>
          <Route path="/signIn" element={<SignIn/>}>
          </Route>
          <Route path="/admin/patients" element={<AdminPatients/>}>
          </Route>
          <Route path="/admin/doctors" element={<AdminDoctors/>}>
          </Route>
          <Route path="/admin/specializations" element={<AdminSpecializations/>}>
          </Route>
          <Route path="/patients/appointments" element={<PatientAppointments/>}>
          </Route>
          <Route path="/patients/resolutions" element={<PatientResolutions/>}>
          </Route>
          <Route path="/doctors/appointments" element={<DoctorAppointments/>}>
          </Route>
          <Route path="/doctors/resolutions" element={<DoctorResolutions/>}>
          </Route>
          <Route path="/doctors/cards" element={<DoctorCards/>}>
          </Route>
          <Route path="/profile/patient" element={<PatientProfile/>}>
          </Route>
          <Route path="/profile/doctor" element={<DoctorProfile/>}>
          </Route>
          <Route path="/profile/admin" element={<AdminProfile/>}>
          </Route>
          <Route path="/404" element={<NotFound/>}>
          </Route>
        </Routes>
      </BrowserRouter>
  );
}
export default App;
